!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){!function(a,c){b.exports=function(b){b.controller("MainCtrl",["$rootScope","$scope","$state","$timeout","Vindig",function(b,c,d,e,f){c.dialogs={},c.showDialog=function(a){return c.dialogs[a]?!0:!1},c.toggleDialog=function(a){c.dialogs[a]?c.dialogs[a]=!1:c.dialogs[a]=!0},document.onkeydown=function(a){a=a||window.event,27==a.keyCode&&c.$apply(function(){for(var a in c.dialogs)c.dialogs[a]=!1})},f.pages().then(function(a){c.pages=a.data}),c.toggleNav=function(){c.showNav?c.showNav=!1:c.showNav=!0},b.$on("$stateChangeStart",function(){c.showNav=!1}),b.$on("$stateChangeSuccess",function(){c.embedUrl=d.href(d.current.name||"home",d.params,{absolute:!0})}),c.toggleDossiers=function(){c.showDossiers?c.showDossiers=!1:c.showDossiers=!0},b.$on("$stateChangeStart",function(){c.showDossiers=!1}),c.toggleAdvFilters=function(){c.showAdvFilters?c.showAdvFilters=!1:c.showAdvFilters=!0},b.$on("$stateChangeStart",function(){c.showAdvFilters=!1}),c.home=function(){"home"==d.current.name&&(c.initialized=!1)},c.init=function(){c.initialized=!0},c.$watch("initialized",function(){e(function(){b.$broadcast("invalidateMap")},200)}),"home.dossier"==d.current.name||"home.dossier.case"==d.current.name?c.isDossier=!0:c.isDossier=!1,"home.case"==d.current.name?c.isCase=!0:c.isCase=!1,b.$on("dossierCases",function(a,b){c.dossierCases=b}),b.$on("$stateChangeSuccess",function(a,d,e,f,g){"home"!==d.name&&(c.initialized=!0),"home.case"==f.name&&b.$broadcast("invalidateMap")}),b.$on("$stateChangeStart",function(a,b,d,e){"home.dossier"!==b.name&&"home.dossier.case"!==b.name&&(c.dossierCases=!1),"home.dossier"==b.name||"home.dossier.case"==b.name?c.isDossier=!0:c.isDossier=!1,"home.case"==b.name?c.isCase=!0:c.isCase=!1,"home.dossier"==e.name&&(c.filter.strict={})}),c.$watch("isDossier",function(a,c){a!==c&&b.$broadcast("invalidateMap")}),c.filtered=[],c.casos=[],f.cases().then(function(a){c.casos=a.data;for(var b=a.headers("X-WP-TotalPages"),d=2;b>=d;d++)f.cases({page:d}).then(function(a){c.casos=c.casos.concat(a.data)})}),c.itemsPerPage=20,c.currentPage=0,c.prevPage=function(){c.currentPage>0&&c.currentPage--},c.prevPageDisabled=function(){return 0===c.currentPage?"disabled":""},c.pageCount=function(){return Math.ceil(c.filtered.length/c.itemsPerPage)-1},c.nextPage=function(){c.currentPage<c.pageCount()&&c.currentPage++},c.nextPageDisabled=function(){return c.currentPage===c.pageCount()?"disabled":""},b.$on("nextCase",function(b,e){var f;a.each(c.filtered,function(a,b){a.ID==e.ID&&(f=b)}),f>=0&&c.filtered[f+1]&&d.go("home.case",{caseId:c.filtered[f+1].ID})}),b.$on("prevCase",function(b,e){var f;a.each(c.filtered,function(a,b){a.ID==e.ID&&(f=b)}),f>=0&&c.filtered[f-1]&&d.go("home.case",{caseId:c.filtered[f-1].ID})}),f.dossiers().then(function(a){c.dossiers=a.data}),c.filter={text:"",strict:{},date:{min:0,max:0}},c.dateFilters=[0,0],c.dropdownFilters={};var g=function(b){var d=a.sortBy(f.getUniq(b,"ano"),function(a){return parseInt(a)});(!c.dateFilters[0]||parseInt(a.min(d))<c.dateFilters[0])&&(c.dateFilters[0]=parseInt(a.min(d)),c.filter.date.min=parseInt(a.min(d))),(!c.dateFilters[1]||parseInt(a.max(d))>c.dateFilters[1])&&(c.dateFilters[1]=parseInt(a.max(d)),c.filter.date.max=parseInt(a.max(d))),c.filter.strict.uf||(c.dropdownFilters.uf=a.sortBy(f.getUniq(b,"uf"),function(a){return a})),c.filter.strict.relatorio||(c.dropdownFilters.relatorio=a.sortBy(f.getUniq(b,"relatorio"),function(a){return a})),c.filter.strict.povo||(c.dropdownFilters.povo=a.sortBy(f.getUniq(b,"povo"),function(a){return a}))};c.$watch("casos",g);var h="casos | filter:filter.text | exact:filter.strict | dateFilter:filter.date | caseIds:dossierCases";b.$on("caseQuery",function(a,b){c.filter.strict=b},!0),c.$watch(h,function(a){c.filtered=a,g(a)},!0);var i=["aldeia","ano","apelido","cod_funai","cod_ibge","coordinates","descricao","dia","mes","ano","fonte_cimi","idade","municipio","uf","nome","povo","relatorio","terra_indigena"];c.downloadCasos=function(b){var c=[];a.each(b,function(b){var d={};a.each(i,function(a){d[a]=b[a],"string"==typeof d[a]&&(d[a]=d[a].replace(/"/g,'""'))}),c.push(d)}),JSONToCSV(c,"casos",!0)},c.clearFilters=function(){c.filter.text="",c.filter.date.min=parseInt(a.min(anos)),c.filter.date.max=parseInt(a.max(anos)),c.filter.strict={}},c.$on("$stateChangeSuccess",function(a,b){"home.dossier"==b.name&&c.clearFilters()}),c.focusMap=function(a){b.$broadcast("focusMap",a.coordinates)},c.showList=!1,c.toggleCasos=function(){c.showList?c.showList=!1:c.showList=!0,e(function(){b.$broadcast("invalidateMap")},200)}}]),b.controller("HomeCtrl",["$scope","$timeout","Map",function(a,b,c){a.$on("$stateChangeSuccess",function(b,d){("home"==d.name||"home.case"==d.name||"home.page"==d.name)&&(a.mapData=c)}),a.$on("dossierMap",function(b,c){a.mapData=c})}]),b.controller("DossierCtrl",["$rootScope","$timeout","$scope","$sce","Dossier","DossierMap","$state",function(b,c,d,e,f,g,h){if(d.url=h.href("home.dossier",{id:f.data.ID},{absolute:!0}),d.dossier=f.data,d.dossier.content=e.trustAsHtml(d.dossier.content),d.$emit("dossierMap",g),c(function(){b.$broadcast("invalidateMap")},300),d.dossier.casos&&d.dossier.casos.length)b.$broadcast("dossierCases",d.dossier.casos);else if(d.dossier.casos_query){var i=d.dossier.casos_query.split(";"),j={};a.each(i,function(a){a&&(kv=a.split("="),kv.length&&(j[kv[0].trim()]=kv[1].replace(/"/g,"")))}),b.$broadcast("caseQuery",j)}d.whatsapp="whatsapp://send?text="+encodeURIComponent(d.dossier.title+" "+d.url),d.base=vindig.base,d.hiddenContent=!1,d.toggleContent=function(){d.hiddenContent?d.hiddenContent=!1:d.hiddenContent=!0}}]),b.controller("CaseCtrl",["$rootScope","$state","$stateParams","$scope","$sce","Case","Vindig",function(a,b,c,d,e,f,g){d.caso=f.data,d.caso.content=e.trustAsHtml(d.caso.content),0!=c.focus&&a.$broadcast("focusMap",d.caso.coordinates),a.$broadcast("invalidateMap"),d.report=function(a){g.report(d.caso.ID,a).success(function(a){d.reported=!0}).error(function(a){console.log(a)})},d.close=function(){-1!==b.current.name.indexOf("dossier")?b.go("home.dossier",b.current.params):b.go("home")},d.next=function(){a.$broadcast("nextCase",d.caso)},d.prev=function(){a.$broadcast("prevCase",d.caso)}}]),b.controller("PageCtrl",["$scope","$sce","Page",function(a,b,c){a.page=c.data,a.page.content=b.trustAsHtml(a.page.content)}])}}(window._)},{}],2:[function(a,b,c){!function(a,c,d,e){d.mapbox.accessToken="pk.eyJ1IjoiaW5mb2FtYXpvbmlhIiwiYSI6InItajRmMGsifQ.JnRnLDiUXSEpgn7bPDzp7g",b.exports=function(a){a.directive("scrollUp",[function(){return{restrict:"A",scope:{scrollUp:"="},link:function(a,b,d){var e=c(a.scrollUp);c(b).on("click",function(){e.scrollTop(0)})}}}]),a.directive("tagExternal",["$timeout",function(a){return{restrict:"A",link:function(b,d,e){function f(a){var b=a.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof b[1]&&b[1].length>0&&b[1].toLowerCase()!==location.protocol?!0:"string"==typeof b[2]&&b[2].length>0&&b[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"),"")!==location.host?!0:!1}a(function(){c(d).find("a").each(function(){f(c(this).attr("href"))&&c(this).addClass("external").attr({rel:"external",target:"_blank"})})},200)}}}]),a.directive("forceOnclick",[function(){return{restrict:"A",scope:{forceOnclick:"=",forceParent:"@"},link:function(a,b,d){var e,f=a.forceOnclick||500;e=c(a.forceParent?"#"+a.forceParent:b),c(b).on("click",function(){e.addClass("force"),setTimeout(function(){e.removeClass("force")},f)})}}}]),a.directive("map",["$rootScope","$state","Vindig",function(a,b,e){return{restrict:"E",scope:{mapData:"=",markers:"=",heatMarker:"="},link:function(f,g,h){angular.element(g).append('<div id="'+h.id+'"></div>').attr("id","");var i=d.map(h.id,{center:[0,0],zoom:2,maxZoom:18});a.$on("invalidateMap",function(){setTimeout(function(){i.invalidateSize(!0)},15)});var j;a.$on("focusMap",function(a,b){j=b,i.fitBounds(d.latLngBounds([[b[1],b[0]]]))}),f.mapData=!1;var k=!1;f.$watch("mapData",function(a,b){a.ID===b.ID&&k||(k=!0,f.layers=a.layers,setTimeout(function(){a.min_zoom?i.options.minZoom=parseInt(a.min_zoom):i.options.minZoom=1,a.max_zoom?i.options.maxZoom=parseInt(a.max_zoom):i.options.maxZoom=18,setTimeout(function(){i.setView(a.center,a.zoom,{reset:!0}),i.setZoom(a.zoom),setTimeout(function(){i.setView(a.center,a.zoom,{reset:!0}),i.setZoom(a.zoom)},100)},200),setTimeout(function(){a.pan_limits&&i.setMaxBounds(d.latLngBounds([a.pan_limits.south,a.pan_limits.west],[a.pan_limits.north,a.pan_limits.east]))},400)},200))});var l=d.divIcon({className:"pin",iconSize:[18,18],iconAnchor:[9,18],popupAnchor:[0,-18]}),m=d.markerClusterGroup({zIndex:100,maxClusterRadius:40,polygonOptions:{fillColor:"#000",color:"#000",opacity:.3,weight:2},spiderLegPolylineOptions:{weight:1,color:"#222",opacity:.4},iconCreateFunction:function(a){var b=a.getChildCount(),c=" marker-cluster-";c+=10>b?"small":100>b?"medium":"large";var e=d.divIcon({html:"<div><span>"+b+"</span></div>",className:"marker-cluster"+c,iconSize:new d.Point(40,40)});return e}});if(m.addTo(i),f.heatMarker){var n=d.heatLayer([],{blur:30});n.addTo(i)}var o=[],p=[];f.$watch("markers",_.debounce(function(a){for(var c in o)m.removeLayer(o[c]);o=[],p=[];for(var c in a){var e=a[c];p.push([e.lat,e.lng]),o[c]=d.marker([e.lat,e.lng],{icon:l}),o[c].post=e,o[c].bindPopup(e.message),o[c].on("mouseover",function(a){a.target.openPopup()}),o[c].on("mouseout",function(a){a.target.closePopup()}),o[c].on("click",function(a){var c=_.extend({focus:!1},a.target.post.state.params);b.go(a.target.post.state.name,c)})}for(var c in o)o[c].addTo(m);f.heatMarker&&n.setLatLngs(p)},300),!0),f.layers=[];var q=[],r=[],s=[],t={},u=!1;c(window).width()<=768&&(u=!0);var v=d.control.layers({},{},{collapsed:u,position:"bottomright",autoZIndex:!1}).addTo(i),w=d.mapbox.legendControl().addTo(i);v.addOverlay(m,"Casos"),i.on("layeradd",function(a){a.layer._vindig_id&&(t[a.layer._vindig_id].control&&i.addControl(t[a.layer._vindig_id].control),t[a.layer._vindig_id].legend&&w.addLegend(t[a.layer._vindig_id].legend))}),i.on("layerremove",function(a){a.layer._vindig_id&&(t[a.layer._vindig_id].control&&i.removeControl(t[a.layer._vindig_id].control),t[a.layer._vindig_id].legend&&w.removeLegend(t[a.layer._vindig_id].legend))}),f.$watch("layers",function(a,b){(a!==b||_.isEmpty(t))&&(b&&b.length&&(q.length&&(_.each(q,function(a){i.removeLayer(a.layer)}),q=[]),r.length&&(_.each(r,function(a){v.removeLayer(a.layer),i.hasLayer(a.layer)&&i.removeLayer(a.layer)}),r=[]),s.length&&(_.each(s,function(a){v.removeLayer(a.layer),i.hasLayer(a.layer)&&i.removeLayer(a.layer)}),s=[])),a&&a.length&&(_.each(a,function(a,b){a.zIndex=b+10,a.ID=a.ID||"base",t[a.ID]&&"base"!=a.ID||(t[a.ID]=e.getLayer(a,i)),"fixed"!=a.filtering&&a.filtering?"swap"==a.filtering?(a.first_swap&&i.addLayer(t[a.ID].layer),r.push(t[a.ID])):"switch"==a.filtering&&(a.hidden||i.addLayer(t[a.ID].layer),s.push(t[a.ID])):(q.push(t[a.ID]),i.addLayer(t[a.ID].layer))}),r=r.reverse(),_.each(r,function(a){v.addBaseLayer(a.layer,a.name)}),s=s.reverse(),_.each(s,function(a){v.addOverlay(a.layer,a.name)})))})}}}])}}(window.vindig,window.jQuery,window.L)},{}],3:[function(a,b,c){!function(a,c){b.exports=function(b){b.filter("offset",function(){return function(a,b){return b=parseInt(b,10),a.slice(b)}}),b.filter("exact",function(){return function(a,b){var c,d=[],e=!0;return angular.forEach(b,function(a,b){e=e&&!a}),e?a:(angular.forEach(a,function(a){c=!0,angular.forEach(b,function(b,d){b&&(c=c&&a[d]===b)}),c&&d.push(a)}),d)}}),b.filter("caseIds",function(){return function(b,c){return c&&c.length&&(b=a.filter(b,function(a){return-1!=c.indexOf(a.ID)})),b}}),b.filter("casoName",[function(){return function(a){var b="";return a&&(a.nome?(b+=a.nome,a.apelido&&(b+=" ("+a.apelido+")")):b+=a.apelido?a.apelido:"Não identificado"),b}}]),b.filter("casoDate",["$sce",function(a){return function(b){var c="";return b.ano&&(c='<span class="ano">'+b.ano+"</span>"),b.mes&&(c+='<span class="mes">/'+b.mes+"</span>"),b.dia&&(c+='<span class="dia">/'+b.dia+"</span>"),a.trustAsHtml(c)}}]),b.filter("caseLocation",["$sce",function(a){return function(b,c){var d="";return b.terra_indigena&&(d=c?'<span class="ti"><span class="label">Terra indígena</span> '+b.terra_indigena+"</span>":'<span class="ti">'+b.terra_indigena+"</span>"),b.municipio&&(d+=c?'<span class="mun"><span class="label">Município</span> '+b.municipio+"</span>":'<span class="mun">'+b.municipio+"</span>"),b.uf&&(d+=c?'<span class="uf"><span class="label">Estado</span> '+b.uf+"</span>":'<span class="uf">'+b.uf+"</span>"),a.trustAsHtml(d)}}]),b.filter("dateFilter",[function(){return function(b,c){return b&&b.length&&(b=a.filter(b,function(a){var b=parseInt(a.ano);return b>=c.min&&b<=c.max})),b}}]),b.filter("postToMarker",["casoNameFilter","$state",function(b,c){return a.memoize(function(d,e,f){var g="";if(c.current.name==f?g+=f+".":e&&(g+=e+"."),d&&d.length){var h={};return a.each(d,function(a){a.coordinates&&(params={},params[a.type+"Id"]=a.ID,h[a.ID]={lat:a.coordinates[1],lng:a.coordinates[0],message:"<h2>"+b(a)+"</h2>",state:{name:g+a.type,params:params}})}),h}return{}},function(){return JSON.stringify(arguments)})}])}}(window._)},{}],4:[function(a,b,c){a("./util"),function(b,c,d){var e=b.module("vindigena",["ui.router","djds4rce.angular-socialshare","ui-rangeSlider","fitVids"],["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|whatsapp|file):/)}]);e.config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,d,e,f){e.html5Mode({enabled:!1,requireBase:!1}),e.hashPrefix("!"),a.state("home",{url:"/",controller:"HomeCtrl",templateUrl:c.base+"/views/index.html",resolve:{Map:["$q","Vindig",function(a,b){var d=a.defer();return c.featured_map?b.getPost(c.featured_map).then(function(a){d.resolve(a.data)}):b.maps().then(function(a){d.resolve(a.data[0])}),d.promise}]}}).state("home.page",{url:"p/:id/",controller:"PageCtrl",templateUrl:c.base+"/views/page.html",resolve:{Page:["$stateParams","Vindig",function(a,b){return b.getPost(a.id)}]}}).state("home.case",{url:"caso/:caseId/",controller:"CaseCtrl",templateUrl:c.base+"/views/case.html",params:{focus:!0},resolve:{Case:["$stateParams","Vindig",function(a,b){return b.getPost(a.caseId)}]}}).state("home.dossier",{url:"dossie/:dossierId/",controller:"DossierCtrl",templateUrl:c.base+"/views/dossier.html",resolve:{Dossier:["$stateParams","Vindig",function(a,b){return b.getPost(a.dossierId)}],DossierMap:["$q","Dossier","Vindig",function(a,b,d){var e=b.data.maps.length?b.data.maps[0]:c.featured_map,f=a.defer();return d.getPost(e).then(function(a){f.resolve(a.data)}),f.promise}]}}).state("home.dossier.case",{url:":caseId/",controller:"CaseCtrl",templateUrl:c.base+"/views/case.html",params:{focus:!0},resolve:{Case:["$stateParams","Vindig",function(a,b){return b.getPost(a.caseId)}]}}),d.rule(function(a,c){var d,e=c.path(),f=c.search();if("/"!==e[e.length-1])return 0===Object.keys(f).length?e+"/":(d=[],b.forEach(f,function(a,b){d.push(b+"="+a)}),e+"/?"+d.join("&"))})}]).run(["$FB",function(a){a.init("1496777703986386")}]),a("./services")(e),a("./filters")(e),a("./directives")(e),a("./controllers")(e),b.element(document).ready(function(){b.bootstrap(document,["vindigena"])})}(window.angular,window.vindig)},{"./controllers":1,"./directives":2,"./filters":3,"./services":5,"./util":6}],5:[function(a,b,c){!function(a,c,d){b.exports=function(b){b.config(["$httpProvider",function(a){a.defaults.paramSerializer="$httpParamSerializerJQLike"}]),b.factory("Vindig",["$http",function(b){return{pages:function(c,d){return c=c||{},c=_.extend({type:"page"},c),d=d||{},d=_.extend({posts_per_page:50,orderby:"menu_order",order:"ASC"},d),c.filter=d,b({method:"GET",url:a.api+"/posts",params:c})},maps:function(c,d){return c=c||{},c=_.extend({type:"map"},c),d=d||{},d=_.extend({posts_per_page:50},d),c.filter=d,b({method:"GET",url:a.api+"/posts",params:c})},cases:function(c,d){return c=c||{},c=_.extend({type:"case"},c),d=d||{},d=_.extend({posts_per_page:80,without_map_query:1},d),c.filter=d,b({method:"GET",url:a.api+"/posts",params:c})},report:function(c,d){return b({method:"POST",url:a.api+"/posts/"+c+"/denuncia",data:{message:d}})},dossiers:function(c,d){return c=c||{},c=_.extend({type:"dossier"},c),d=d||{},d=_.extend({posts_per_page:50,without_map_query:1},d),c.filter=d,b({method:"GET",url:a.api+"/posts",params:c})},getLayer:function(a,b){var d={name:a.title||""};if("mapbox"==a.type){var e=c.mapbox.tileLayer(a.mapbox_id),f=c.mapbox.gridLayer(a.mapbox_id);d.layer=c.layerGroup([e,f]),d.control=c.mapbox.gridControl(f)}else"tilelayer"==a.type&&(d.layer=c.tileLayer(a.tile_url));return a.legend&&(d.legend=a.legend),d.layer&&(a.zIndex&&d.layer.setZIndex(a.zIndex),d.layer._vindig_id=a.ID),d},getPost:function(c){return b.get(a.api+"/posts/"+c)},getUniq:function(a,b,c){var d=[];if(_.each(a,function(a){a[b]&&(angular.isArray(a[b])?a[b].length&&(d=d.concat(a[b])):d.push(a[b]))}),d.length){var e=_.uniq(d,function(a,b){return"undefined"!=typeof c&&a[c]?a[c]:a});return _.compact(e)}return[]}}}])}}(window.vindig,window.L)},{}],6:[function(a,b,c){window.JSONToCSV=function(a,b,c){var d="object"!=typeof a?JSON.parse(a):a,e="";if(c){var f="";for(var g in d[0])f+=g+",";f=f.slice(0,-1),e+=f+"\r\n"}for(var h=0;h<d.length;h++){var f="";for(var g in d[h])f+='"'+d[h][g]+'",';f.slice(0,f.length-1),e+=f+"\r\n"}if(""==e)return void alert("Invalid data");var i=b.replace(/ /g,"_"),j="data:text/csv;charset=iso-8859-1,"+escape(e),k=document.createElement("a");k.href=j,k.style="visibility:hidden",k.download=i+".csv",document.body.appendChild(k),k.click(),document.body.removeChild(k)}},{}]},{},[4]);
//# sourceMappingURL=app.js.map