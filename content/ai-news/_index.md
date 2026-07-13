---
title: "AI News"
description: "Curated AI news: a daily model-picked selection of significant releases, research, and industry moves — each card links to the original post."
# _build самой секции: рендерить (cascade ниже применился бы и к ней тоже)
_build:
  render: always
  list: always
# Карточки не получают собственных страниц и не попадают в глобальные списки (главная, RSS, sitemap)
cascade:
  _build:
    render: never
    list: local
---
