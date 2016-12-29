
#coding=utf-8
import scrapy

class XinhuaSpider(scrapy.Spider):
    name = "spiders"

    start_urls = ["http://www.zs-hospital.sh.cn/zhuanjia/index.aspx/"]
    # def parse(self, resp):
    #     for ks in resp.css('div.icon'):
    #         baseUrl = 'http://www.zs-hospital.sh.cn/'
    #         dept = ks.css('div.text::text').extract_first()
    #         # print(dept)
    #         link = baseUrl + ks.css('div.icon::attr(onclick)').extract_first()[22:50]
    #         ks = ks.css('div.text::text').extract_first()
    #         print(ks)
    #         print(link)
    #         yield scrapy.Request(resp.urljoin(link), self.parse_doc, meta={'keshi': ks})

    # def parse_doc(self, resp):
    #     for td in resp.css('tr.hover'):
    #         baseUrl = 'http://www.zs-hospital.sh.cn/zhuanjia/'
    #         ks_detail = baseUrl +  td.css('tr.hover::attr(onclick)').extract_first()[21:41]
    #         # print(ks_detail)
    #         yield scrapy.Request(resp.urljoin(ks_detail), self.parse_doc_detail, meta={'keshi':resp.meta['keshi']})

    # def parse_doc_detail(self, resp):
    #     baseUrl = 'http://www.zs-hospital.sh.cn/'
    #     tab = resp.css('table.detail')
    #     content = resp.css('div.content div.title::text').extract_first().split()
    #     name = content[0] #姓名
    #     title = content[1]  #职位
    #     img = baseUrl + resp.css('div.doctor-detail img::attr(src)').extract_first()[3:] #头像
    #     # table = resp.css('div.content table.detail tr')
    #     for table in resp.css('.detail'):
    #         text01_1 = table.xpath("//tr[1]/td[1]/text()").extract_first()
    #         text01_2 = table.xpath("//tr[1]/td[2]/text()").extract_first()
    #         text02_1 = table.xpath("//tr[2]/td[1]/text()").extract_first()
    #         text02_2 = table.xpath("//tr[2]/td[2]/text()").extract_first()
    #     # if text01_1 == '专长':
    #     specialize = table.xpath("//tr[1]/td[2]/text()").extract_first() #专长

    #     yield {
    #     'text01_1' : text01_1,
    #     'text01_2' : text01_2,
    #     'text02_1' : text02_1,
    #     'text02_2' : text02_2,
    #     'img' : img,
    #     'name' : name,
    #     'hospital': '复旦大学医学院附属中山医院',
    #     'title' : title,
    #     'specialize' : specialize,
    #     'text01_1' : text01_1,
    #     'main_dept': resp.meta['keshi'],
    #     }
        #py -m pip install --upgrade pip
