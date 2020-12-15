/*
 * @Author: czy0729
 * @Date: 2020-12-14 10:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-14 18:15:57
 */
const fs = require('fs')
const filename = 'Bangumi_事件列表_20201114_20201213.csv'

const lines = String(fs.readFileSync(`./csv/${filename}`)).split('\n')
lines.shift()

const temp = {
  total: 0,
}
lines
  .filter((item) => !!item)
  .forEach((item) => {
    const [date, v, event, name, pv, uv] = item.split(',')
    const [page] = name.split('.')
    if (!temp[name]) {
      temp[name] = Number(pv)
    } else {
      temp[name] += Number(pv)
    }
    temp.total += Number(pv)

    if (!temp[page]) {
      temp[page] = Number(pv)
    } else {
      temp[page] += Number(pv)
    }
  })

// 输出的对象key排序
const data = {}
Object.keys(temp)
  .sort((a, b) => temp[b] - temp[a])
  .forEach((key) => {
    data[key] = temp[key]
  })

fs.writeFileSync('./data/heatmap.json', JSON.stringify(data, null, 2))
