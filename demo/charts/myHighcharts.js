
        $(function () {
           var chart =  $('#container').highcharts({
                chart: {
                    type: 'line',
                    animation : false,
                    events : {
                        load : renderLengend
                    }
                },
                colors: [
                    '#81d04e', '#fe7866', '#7ab4ee'
                ],
                title: {
                    text: 'Performance Trend <span style="font-size: 70%;"> Inquires : 139</span>',
                    align: 'left',
                    useHTML: true
                    //floating : true
                },
                xAxis: {
                    //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    //    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    type : 'datetime',
                    dateTimeLabelFormats: {day:'%Y-%m-%d'}
                    //minRange: 15
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value ;
                        }
                    }
                },
                credits : {
                    enabled: false
                },
                tooltip: {
                    crosshairs: true,//cross y-line
                    shared: true, //point detail together
                    backgroundColor: '#474747',
                    borderRadius:10,
                    style: {
                        color: '#fff',
                        'text-align': 'center'
                    },
                   // align: 'right',
                    headerFormat: '<p style="color:white;text-align: center;">{point.key}</p><br/>',
                    pointFormat: '<span style="color:{series.color}">{series.name}: {point.y}</span><br/>',
                    xDateFormat: '%Y-%m-%d'
                    //followPointer:false,
                    //followTouchMove:false
                },
                plotOptions: {
                    series: {
                        //showCheckbox: true,
                        pointStart: Date.UTC(2012, 0, 1),
                        pointInterval: 24  * 1000 *3600,
                        //showInLegend : false,
                        //enableMouseTracking:false,

                        allowPointSelect: true,
                        marker: {//重复定义被覆盖
                            states: {
                                select: {
                                    fillColor: '#A0B0FD',
                                    lineWidth: 2,
                                    lineColor: null
                                },
                             hover: {
                                    //enabled: false,
                                 fillColor: '#FFFFFF',
                                 lineWidth: 2,
                                 //some problem here
                                  lineColor: null,
                                 radius: 4
                                }
                            }
                        },
                        events : {
                            mouseOver : function(){
                                console.log(this);
                               var hover = this.pointAttr.hover;
                               hover.stroke = this.color;
                            },
                            mouseOut : function(){
                            }
                        }
                    },
                    line: {
                       marker: {
                          //radius: 4,
                           //lineColor: 'blue',
                           //lineWidth: 1
                       }
                    ,
                    events: {
                            legendItemClick: function (event) {//return false 即可禁用LegendIteml，防止通过点击item显示隐藏系列

                                //var _this = this;
                                $(this).toggle(function(){
                                    $('#checkbox').trigger('click');

                                    //_this.show();
                                },function(){
                                    $('#checkbox').trigger('click');
                                    //_this.hide();
                                });

                                return false;

                            }

                        }
                    }
                },
                legend: {
                    itemDistance: 40,
                    useHTML: true
                },
                series: [
                    {
                        name: 'Top 10\' Average ',
                        marker: {
                            symbol: 'circle'
                        },
                        data: [  7.0, 6.9, 9.5, 1.5, 18.2, 21.5, 25.2,  26.5 , 23.3, 18.3,0.2,20.9],
                        selected: true,

                        dashStyle: 'solid'
                    },
                    {
                        name: 'My Performance ',
                        marker: {
                            symbol: 'circle'
                        },
                        data: [10.1,
                            4.2,
                            5.7,
                            8.5,
                            11.9,
                            15.2,
                            17.0,
                            16.6,
                            14.2,
                            10.3,
                            6.6,
                            4.8
                        ],
                        selected: true,

                    },
                    {
                        name: 'Industry Average ',
                        marker: {
                            symbol: 'circle'
                        },
                        data: [  7.0, 6.9, 9.5, 1.5, 18.2, 21.5, 25.2,  26.5 , 23.3, 18.3,0.2,20.9].reverse(),
                        selected: true,

                        dashStyle: 'solid'
                    }
                ]
            });
            function renderLengend(){
               // var chart = $('#container').highcharts();
                var chart = this;
                var legends = chart.legend.allItems;
                $('.highcharts-legend').css('display','none');

                var checkbox2 = $('<div id="checkbox2"></div>');
                var ul = $('<ul></ul>').addClass("checkbox-item");
                var series = chart.series;
                for(var i=0; i<series.length; i++) {
                    var src = 'photo/check' + i + '.jpg';
                    var img = "<img src='"+ src + "'/>";
                    var text = "<span>"+series[i].name+"</span>";
                    var li = $('<li></li>');
                    $(img).addClass('check').appendTo(li);
                    $(text).appendTo(li);
                    li.appendTo(ul);           
                }
                 ul.appendTo(checkbox2);
                 checkbox2.appendTo($('body'));
                //bind events
                $('#checkbox2 .check').toggle(function(){
                    var this_pic = $(this);
                    changePicState({
                        element : this_pic,
                        sourceSrc : 'check',
                        targetSrc : 'uncheck',
                        show : false
                    });
                },function(){
                    var this_pic = $(this);
                    changePicState({
                        element : this_pic,
                        sourceSrc : 'uncheck',
                        targetSrc : 'check',
                        show : true
                    });
                });
                function changePicState(config){            
                    var this_pic = $(config.element);
                    var src_arr = this_pic.attr('src').split('/');
                    var file_name = src_arr[src_arr.length-1].split('.')[0];
                    var src = this_pic.attr('src').replace(config.sourceSrc, config.targetSrc);
                    this_pic.attr('src', src);
                    var file_num = parseInt(file_name[file_name.length-1] ,10);
                    if(config.show){
                        legends[file_num].show();
                    }else{
                        legends[file_num].hide();
                    }
                }
            }
        });