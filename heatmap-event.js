/*
 * @Author: czy0729
 * @Date: 2020-12-14 18:06:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-14 18:16:32
 */
const fs = require('fs')
const filename =
  'Bangumi_事件(Subject.to)_属性(from)_天_次数分布_20201114_20201213.csv'
const event = '条目.跳转.from'

const lines = String(fs.readFileSync(`./csv/${filename}`)).split('\n')
lines.shift()

const temp = {
  total: 0,
}
lines
  .filter((item) => !!item)
  .forEach((item) => {
    const [date, name, pv] = item.split(',')
    if (!temp[name]) {
      temp[name] = Number(pv)
    } else {
      temp[name] += Number(pv)
    }
    temp.total += Number(pv)
  })

// 输出的对象key排序
const data = {}
Object.keys(temp)
  .sort((a, b) => temp[b] - temp[a])
  .forEach((key) => {
    data[key] = temp[key]
  })

const sub = JSON.parse(fs.readFileSync('./data/heatmap-event.json'))
sub[event] = data
fs.writeFileSync('./data/heatmap-event.json', JSON.stringify(sub, null, 2))
