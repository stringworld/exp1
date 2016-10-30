/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){

    var raw = [
        {
            "id":1,
            "name":"北京",
            "cityList":[
                {   "id":1,
                    "name":"请选择"
                },
                {   "id":2,
                    "name":"东城区"
                },
                {   "id":3,
                    "name":"西城区"
                },
                {   "id":4,
                    "name":"崇文区"
                },
                {   "id":5,
                    "name":"宣武区"
                },
                {   "id":6,
                    "name":"朝阳区"
                }
            ],
            "type":0
        },
        {
            "id":2,
            "name":"上海",
            "cityList":[
                {   "id":1,
                    "name":"请选择"
                },
                {   "id":2,
                    "name":"黄浦区"
                },
                {   "id":3,
                    "name":"卢湾区"
                },
                {   "id":4,
                    "name":"徐汇区"
                },
                {   "id":5,
                    "name":"长宁区"
                },
                {   "id":6,
                    "name":"静安区"
                }
            ],
            "type":0
        },
        {
            "id":3,
            "name":"天津",
            "cityList":[
                {   "id":1,
                    "name":"请选择"
                },
                {   "id":2,
                    "name":"和平区"
                },
                {   "id":3,
                    "name":"河东区"
                },
                {   "id":4,
                    "name":"河西区"
                },
                {   "id":5,
                    "name":"南开区"
                },
                {   "id":6,
                    "name":"河北区"
                }
            ],
            "type":0
        },
        {
            "id":4,
            "name":"重庆",
            "cityList":[
                {   "id":1,
                    "name":"请选择"
                },
                {   "id":2,
                    "name":"渝中区"
                },
                {   "id":3,
                    "name":"大渡口区"
                },
                {   "id":4,
                    "name":"江北区"
                },
                {   "id":5,
                    "name":"南岸区"
                },
                {   "id":6,
                    "name":"北碚区"
                }
            ],
            "type":0
        }
    ];


    "use strict";

    var cityList = function(data) {
        if(!data.cityList) return [""];
        return (data.cityList.map(d=>d.name));
    };

    var getCities = function(d) {
        for(var i=0;i< raw.length;i++) {
            if(raw[i].name === d) return cityList(raw[i]);
        }
        return [""];
    };

    var provinces = raw.map(function(d) {
        return d.name;
    });

    //默认值
    var initCities = cityList(raw[0]);
    var currentProvince = provinces[0];

    console.log(provinces)
    console.log(initCities)

    var t;
    var defaults = {

        cssClass: "city-picker",
        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
            var newProvince = picker.cols[0].value;
            if(newProvince !== currentProvince) {
                // 如果Provinces变化，节流以提高reRender性能
                clearTimeout(t);

                t = setTimeout(function(){
                    var newCities = getCities(newProvince);
                    console.log(newProvince)
                    picker.cols[1].replaceValues(newCities);
                    currentProvince = newProvince;
                    picker.updateValue();
                }, 200);
                return;
            }
            Zepto(this).getCode({values});
        },
        cols: [
        {
            textAlign: 'center',
            values: provinces,
            cssClass: "col-province"
        },
        {
            textAlign: 'center',
            values: initCities,
            cssClass: "col-city"
        }
        ]
    };

    $.fn.cityPicker = function(params) {
        console.log(this)
        return this.each(function() {
            if(!this) return;
            var p = $.extend(defaults, params);
            $(this).picker(p);
        });
    };
    Zepto.fn.getCode=function({values}){
        // return (function(values){
            var mm=raw.filter(function(index) {
                return index.name===values[0];
            }).map(function(d) {
                var aa=d.cityList.filter(function(index) {
                    return index.name===values[1];
                }).map(function(d) {
                    return d.id;
                });
                var temp={
                    first:d.id,
                    two:aa[0]
                }
                return temp;
            });
            var tem={
                res:values+'-'+mm[0].first+'-'+mm[0].two
            }
            console.log(tem)
            // return tem;
        // })
    }

}(Zepto);
