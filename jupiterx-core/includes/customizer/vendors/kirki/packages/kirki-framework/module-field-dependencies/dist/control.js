var i={listenTo:{},init:function(){var i=this;wp.customize.control.each((function(e){i.showKirkiControl(e)})),_.each(i.listenTo,(function(e,r){_.each(e,(function(e){wp.customize(r,(function(r){wp.customize.control(e,(function(t){var n,a;a=function(){return i.showKirkiControl(wp.customize.control(e))},(n=function(){t.active.set(a())})(),r.bind(n),t.active.validate=a}))}))}))}))},showKirkiControl:function(i){var e,r=!0,t=i.params&&i.params.kirkiOptionType&&"option"===i.params.kirkiOptionType&&i.params.kirkiOptionName&&!_.isEmpty(i.params.kirkiOptionName),n="AND",a=[];if(_.isString(i)&&(i=wp.customize.control(i)),void 0===i||i.params&&_.isEmpty(i.params.required))return!0;if(_.isArray(i.params.required))for(e=0;e<i.params.required.length;e++)this.checkCondition(i.params.required[e],i,t,n)||(r=!1);else if(_.isObject(i.params.required)){for(var o in n=_.isUndefined(i.params.required.relation)?n:i.params.required.relation,i.params.required.terms)a.push(this.checkCondition(i.params.required.terms[o],i,t,n));"OR"===n&&(r=-1!==a.indexOf(!0)),"AND"===n&&(r=-1===a.indexOf(!1))}return r},checkCondition:function(i,e,r,t){var n,a,o=this,s=t;if(r&&i.setting&&-1===i.setting.indexOf(e.params.kirkiOptionName+"[")&&(i.setting=e.params.kirkiOptionName+"["+i.setting+"]"),(_.isArray(i)||_.isObject(i))&&void 0===i.setting){if(n=[],_.isArray(i))for(s="AND"===s?"OR":"AND",a=0;a<i.length;a++)n.push(o.checkCondition(i[a],e,r,s));else if(_.isObject(i))for(var u in s=_.isUndefined(i.relation)?"AND":i.relation,i.terms)n.push(o.checkCondition(i.terms[u],e,r,s));return"OR"===s?-1!==n.indexOf(!0):-1===n.indexOf(!1)}return void 0===wp.customize.control(i.setting)||(o.listenTo[i.setting]=o.listenTo[i.setting]||[],-1===o.listenTo[i.setting].indexOf(e.id)&&o.listenTo[i.setting].push(e.id),o.evaluate(i.value,wp.customize.control(i.setting).setting._value,i.operator))},evaluate:function(i,e,r){var t=!1;if("==="===r)return i===e;if("=="===r||"="===r||"equals"===r||"equal"===r)return i==e;if("!=="===r)return i!==e;if("!="===r||"not equal"===r)return i!=e;if(">="===r||"greater or equal"===r||"equal or greater"===r)return e>=i;if("<="===r||"smaller or equal"===r||"equal or smaller"===r)return e<=i;if(">"===r||"greater"===r)return e>i;if("<"===r||"smaller"===r)return e<i;if("contains"===r||"in"===r){if(_.isArray(i)&&_.isArray(e))return _.each(e,(function(e){if(i.includes(e))return t=!0,!1})),t;if(_.isArray(e))return _.each(e,(function(e){e==i&&(t=!0)})),t;if(_.isObject(e))return _.isUndefined(e[i])||(t=!0),_.each(e,(function(e){i===e&&(t=!0)})),t;if(_.isString(e))return _.isString(i)?-1<i.indexOf(e)&&-1<e.indexOf(i):-1<i.indexOf(e)}return i==e}};jQuery(document).ready((function(){i.init()}));
