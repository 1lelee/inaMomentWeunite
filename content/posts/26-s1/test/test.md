---
title: "test"
date: 2026-02-19
categories: ["blue"]          # 紫色代表国会/公权力
tags: ["1", "1"]
summary: "qwertttttest"
draft: false
evidences:
  - type: "新闻报道"
    url: "https://news.tvchosun.com/site/data/html_dir/2024/05/18/2024051890073.html"
  - type: "图片留存"
    url: "/images/24-s2/image.png"   # 图片放在 static/images/ 下
related_posts:               # 手动指定的相关文章列表
  - title: "Newjeans推动练习生人权法案"                # 相关文章的标题（用于显示）
    link: "/posts/purple/dance-lifa"                  # 相关文章的链接（相对路径，如 "/posts/hanni-congress/"）
  - title: "Danielle在Phoning里的日历被删除"
    link: "/posts/black/daniphoning"
---
### 这是一个测试
## This is a test page
### 이것은 테스트입니다. 

<!-- 要导入的md文件 (绝对路径, 忽略.md后缀) -->
{{% include "/articles/test" %}} 

<!-- 要插入的图片 (绝对路径, 图片放置static或assets的images) -->
{{< figure src="/images/24-s2/image.png" alt="01.png" width="500px" >}}

<!-- 要下载的文件 (绝对路径， 文件放置static) -->
["英文版判决书"](/upload/SC_DC_2024GaHap110222_Judgment_English%20(英文版).pdf)
