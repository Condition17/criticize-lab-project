require 'nokogiri'
require 'pry'
require 'json'
require 'httparty'

def arrayOf(part, name)
	tagList = part.css(".credit_summary_item").css("span[itemprop='#{name}']")
	result = Array.new();
	tagList.each do 
		|item|
		result.push(item.css("a").css("span").text)
	end
	return result
end

def writeToFile(filename, content)
	File.open(filename,"w") do |f|
		f.puts content
	end
end

def getContent(links)
	content = Array.new()
	index = 0
	links.each do |link|

		movie = Hash.new()
		page = Nokogiri::HTML(HTTParty.get(link))
		index += 1;
		section = page.css("#main_top")
		upperPart = section.css(".vital")
		movie[:picture] = page.css(".poster").css("a").css("img").last.attributes["src"].value
		movie[:year] = upperPart.css(".title_wrapper").css("h1").css("#titleYear").first.children.children.text
		movie[:name] = upperPart.css(".title_wrapper").css("h1").children.first.text
		puts "#{movie[:name]}(#{index}/#{links.length})"
		lowerPart = page.css(".plot_summary")
		movie[:rating] = page.css("span[itemprop='ratingValue']").text
		movie[:description] = lowerPart.css(".summary_text").children.text.strip
		movie[:director] = arrayOf(lowerPart,'director')
		movie[:writer] = arrayOf(lowerPart, 'creator')
		movie[:actor] = arrayOf(lowerPart, 'actors')
		content.push(movie)
		sleep(1)
	
	end
	return JSON.pretty_generate(content)
end

def getLinks()
	links = []
	sitename = "http://www.imdb.com"
	page = Nokogiri::HTML(HTTParty.get("http://www.imdb.com/chart/top"))
	items = page.css(".lister-list").css("tr")
	items.each { |item| links<<sitename + item.css(".titleColumn").css("a")[0].attributes.first[1].value }
	return links
end

links = getLinks()
data = getContent(links)
writeToFile("../data/movies.json",data)