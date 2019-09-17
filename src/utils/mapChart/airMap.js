import echarts from 'echarts'

function initAirMapChart (node, data, geoCoordMap) {
  var AirMap = echarts.init(document.getElementById(node))
  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  // 该图渲染异常
  AirMap.setOption({
    // title: {
    //   text: '全国主要城市空气质量 - 百度地图',
    //   subtext: 'data from PM25.in',
    //   sublink: 'http://www.pm25.in',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [104.114129, 37.550339],
      zoom: 5,
      roam: true,
      mapStyle: {
        styleJson: [{
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'land',
          'elementType': 'all',
          'stylers': {
            'color': '#f3f3f3'
          }
        }, {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            'color': '#fdfdfd'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry',
          'stylers': {
            'color': '#fefefe'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#fefefe'
          }
        }, {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'green',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'manmade',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'local',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'boundary',
          'elementType': 'all',
          'stylers': {
            'color': '#fefefe'
          }
        }, {
          'featureType': 'building',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'label',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#999999'
          }
        }]
      }
    },
    series: [
      {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data),
        symbolSize: 15,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: 'purple'
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(data),
        symbolSize: 15,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  })
  return AirMap
}

export { initAirMapChart }
