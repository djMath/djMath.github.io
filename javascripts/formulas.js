/* 
* @Author: JacobSamro, Dhinakaran
*/

'use strict';

var formula = {
	//Circle from Radius Data
	areaofCirclefromRadius : function(radius){
		return Math.PI * (radius * radius);
	},
	circumferenceofCirclefromRadius : function(radius){
		return (2 * Math.PI * radius);
	},
	diameterofCirclefromRadius : function(radius){
		return radius*2;
	}
};