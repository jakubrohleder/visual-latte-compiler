(function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,9],$V2=[4,9,10],$V3=[1,15],$V4=[1,18],$V5=[22,25],$V6=[10,14],$V7=[1,38],$V8=[1,41],$V9=[19,25],$Va=[2,41],$Vb=[1,42],$Vc=[1,47],$Vd=[1,54],$Ve=[1,61],$Vf=[1,49],$Vg=[1,50],$Vh=[1,51],$Vi=[1,52],$Vj=[1,58],$Vk=[1,59],$Vl=[1,60],$Vm=[1,62],$Vn=[1,63],$Vo=[1,65],$Vp=[1,66],$Vq=[1,68],$Vr=[1,71],$Vs=[4,9,10,13,14,19,20,34,35,36,37,38,45,48,49,55,56,58,59],$Vt=[10,13,14,19,20,34,35,37,38,45,48,49,55,56,58,59],$Vu=[10,13,14,19,20,34,35,36,37,38,45,48,49,55,56,58,59],$Vv=[2,62],$Vw=[2,49],$Vx=[1,81],$Vy=[1,80],$Vz=[1,79],$VA=[1,96],$VB=[1,103],$VC=[1,104],$VD=[1,95],$VE=[1,92],$VF=[1,93],$VG=[1,94],$VH=[1,97],$VI=[1,98],$VJ=[1,99],$VK=[1,100],$VL=[1,101],$VM=[1,102],$VN=[19,22,25,47,48,60,61,62,63,64,65,66,67,68,69,70,71],$VO=[10,20,45,48,49,55,56,58,59],$VP=[19,20,22,25,30,32,33,46,47,48,54,60,61,62,63,64,65,66,67,68,69,70,71];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"EOF":4,"TopDefs":5,"TopDef":6,"FunctionDecl":7,"ClassDecl":8,"CLASS":9,"IDENT":10,"ClassBlock":11,"EXTENDS":12,"{":13,"}":14,"ClassStms":15,"ClassStm":16,"Type":17,"Items":18,";":19,"(":20,"Args":21,")":22,"Block":23,"Arg":24,",":25,"Stmts":26,"Stmt":27,"ARRAY":28,"Ident":29,"=":30,"Expr":31,"INCR":32,"DECR":33,"RETURN":34,"IF":35,"ELSE":36,"WHILE":37,"FOR":38,":":39,"Item":40,"Exprs":41,"Number":42,"String":43,"Logical":44,"NEW":45,"[":46,"]":47,"-":48,"!":49,"MulOp":50,"AddOp":51,"RelOp":52,"LogOp":53,".":54,"NUMBER":55,"STRING_IDENT":56,"LogVal":57,"TRUE":58,"FALSE":59,"&&":60,"||":61,"+":62,"*":63,"/":64,"%":65,"<":66,"<=":67,">":68,">=":69,"==":70,"!=":71,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",9:"CLASS",10:"IDENT",12:"EXTENDS",13:"{",14:"}",19:";",20:"(",22:")",25:",",28:"ARRAY",30:"=",32:"INCR",33:"DECR",34:"RETURN",35:"IF",36:"ELSE",37:"WHILE",38:"FOR",39:":",45:"NEW",46:"[",47:"]",48:"-",49:"!",54:".",55:"NUMBER",56:"STRING_IDENT",58:"TRUE",59:"FALSE",60:"&&",61:"||",62:"+",63:"*",64:"/",65:"%",66:"<",67:"<=",68:">",69:">=",70:"==",71:"!="},
productions_: [0,[3,1],[3,2],[5,1],[5,2],[6,1],[6,1],[8,3],[8,5],[11,2],[11,3],[15,2],[15,1],[16,3],[16,1],[7,6],[21,0],[21,1],[21,3],[24,2],[23,2],[23,3],[26,1],[26,2],[27,1],[27,3],[27,4],[27,4],[27,3],[27,3],[27,3],[27,2],[27,5],[27,7],[27,5],[27,8],[27,7],[27,2],[27,1],[18,1],[18,3],[40,1],[40,3],[41,0],[41,1],[41,3],[31,1],[31,1],[31,1],[31,1],[31,4],[31,5],[31,2],[31,2],[31,2],[31,3],[31,3],[31,3],[31,3],[31,3],[17,1],[17,2],[29,1],[29,3],[29,4],[42,1],[43,1],[44,1],[57,1],[57,1],[53,1],[53,1],[51,1],[51,1],[50,1],[50,1],[50,1],[52,1],[52,1],[52,1],[52,1],[52,1],[52,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 2:

      return yy.state.Block.create({
        elements: $$[$0-1]
      });

break;
case 3: case 17: case 22: case 39: case 44:
 this.$ = [$$[$0]];
break;
case 4: case 23:
 this.$ = $$[$0-1].concat([$$[$0]]);
break;
case 5: case 6: case 24: case 46: case 47: case 48: case 62:
 this.$ = $$[$0];
break;
case 15:

      this.$ = yy.state.Statement.DeclarationFunction.create({
        args: $$[$0-2],
        block: $$[$0],
        type: $$[$0-5],
        ident: $$[$0-4],
        loc: _$
      });

break;
case 16: case 43:
 this.$ = [];
break;
case 18: case 40: case 45:
 this.$ = $$[$0-2].concat([$$[$0]]);
break;
case 19:

      this.$ = yy.Argument.create({
        type: $$[$0-1],
        ident: $$[$0],
        loc: _$
      });

break;
case 20:

      this.$ = yy.state.Block.create({
        elements: []
      });

break;
case 21:

      this.$ = yy.state.Block.create({
        elements: $$[$0-1]
      });

break;
case 25:

      $$[$0-1].map(function(item) {
        item.type = String($$[$0-2]);
      });

      this.$ = $$[$0-1];

break;
case 26:

      $$[$0-1].map(function(item) {
        item.type = String($$[$0-3]);
      });

      this.$ = $$[$0-1];

break;
case 27:

      this.$ = yy.Statement.Assignment.create({
        ident: $$[$0-3],
        expr: $$[$0-1],
        loc: _$
      });

break;
case 28:

      this.$ = yy.Statement.Incr.create({
        ident: $$[$0-2],
        loc: _$
      });

break;
case 29:

      this.$ = yy.Statement.Decr.create({
        ident: $$[$0-2],
        loc: _$
      });

break;
case 30:

      {
        this.$ = yy.Statement.Return.create({
          expr: $$[$0-1],
          loc: _$
        });
      }

break;
case 31:

      this.$ = yy.Statement.Return.create({
        loc: _$
      });

break;
case 32:

      this.$ = yy.Statement.If.create({
        expr: $$[$0-2],
        right: $$[$0],
        loc: _$
      });

break;
case 33:

      this.$ = yy.Statement.If.create({
        expr: $$[$0-4],
        right: $$[$0-2],
        wrong: $$[$0],
        loc: _$
      });

break;
case 34:

      this.$ = yy.Statement.While.create({
        expr: $$[$0-2],
        stmt: $$[$0],
        loc: _$
      });

break;
case 37: case 59:
 this.$ = $$[$0-1];
break;
case 38:
 this.$ = undefined;
break;
case 41:

      this.$ = yy.Statement.DeclarationVariable.create({
        ident: $$[$0],
        loc: _$
      });

break;
case 42:

      var decl = yy.Statement.DeclarationVariable.create({
        ident: $$[$0-2],
        loc: _$
      });
      var ass = yy.Statement.Assignment.create({
        ident: $$[$0-2],
        expr: $$[$0],
        loc: _$
      });
      this.$ = [decl, ass];

break;
case 49:

      this.$ = yy.Expression.Variable.create({
        ident: $$[$0],
        loc: _$
      });

break;
case 50:

      this.$ = yy.Expression.Funcall.create({
        args: $$[$0-1],
        ident: $$[$0-3],
        loc: _$
      });

break;
case 51:
 console.log('undefined NEW IDENT [ Expr ]');
break;
case 52:
 console.log('undefined NEW IDENT ');
break;
case 53:

      this.$ = yy.Expression.Uminus.create({
        expr: $$[$0],
        loc: _$
      });

break;
case 54:

      this.$ = yy.Expression.Negation.create({
        expr: $$[$0],
        loc: _$
      });

break;
case 55: case 56: case 57: case 58:

      this.$ = yy.Expression.Operation.create({
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0],
        loc: _$
      });

break;
case 60:
 this.$ = String($$[$0]);
break;
case 61:
 this.$ = String($$[$0-1]);
break;
case 63:
 console.log('undefined Ident . IDENT');
break;
case 64:
 console.log('undefined Ident [ Expr ]');
break;
case 65:

      this.$ = yy.Expression.Object.create({
        type: 'int',
        value: Number(yytext),
        loc: _$
      });

break;
case 66:

      this.$ = yy.Expression.Object.create({
        type: 'string',
        value: String(yytext),
        loc: _$
      });

break;
case 67:

      this.$ = yy.Expression.Object.create({
        type: 'boolean',
        value: JSON.parse($$[$0]),
        loc: _$
      });

break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:6,9:$V0,10:$V1,17:7},{1:[3]},{1:[2,1]},{4:[1,10],6:11,7:5,8:6,9:$V0,10:$V1,17:7},o($V2,[2,3]),o($V2,[2,5]),o($V2,[2,6]),{10:[1,12]},{10:[1,13]},{10:[2,60],28:[1,14]},{1:[2,2]},o($V2,[2,4]),{20:$V3},{11:16,12:[1,17],13:$V4},{10:[2,61]},o($V5,[2,16],{21:19,24:20,17:21,10:$V1}),o($V2,[2,7]),{10:[1,22]},{7:27,10:$V1,14:[1,23],15:24,16:25,17:26},{22:[1,28],25:[1,29]},o($V5,[2,17]),{10:[1,30]},{11:31,13:$V4},o($V2,[2,9]),{7:27,10:$V1,14:[1,32],16:33,17:26},o($V6,[2,12]),{10:[1,35],18:34,40:36},o($V6,[2,14]),{13:$V7,23:37},{10:$V1,17:21,24:39},o($V5,[2,19]),o($V2,[2,8]),o($V2,[2,10]),o($V6,[2,11]),{19:[1,40],25:$V8},o($V9,$Va,{20:$V3,30:$Vb}),o($V9,[2,39]),o([4,9,10,14],[2,15]),{10:$Vc,13:$V7,14:[1,43],19:$Vd,20:$Ve,23:46,26:44,27:45,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($V5,[2,18]),o($V6,[2,13]),{10:$Vq,40:67},{10:$Vr,20:$Ve,29:70,31:69,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($Vs,[2,20]),{10:$Vc,13:$V7,14:[1,72],19:$Vd,20:$Ve,23:46,27:73,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($Vt,[2,22]),o($Vu,[2,24]),o([19,20,30,32,33,46,48,54,60,61,62,63,64,65,66,67,68,69,70,71],$Vv,{40:36,18:74,10:$Vq,28:[1,75]}),o([19,48,60,61,62,63,64,65,66,67,68,69,70,71],$Vw,{20:$Vx,30:[1,76],32:[1,77],33:[1,78],46:$Vy,54:$Vz}),{10:$Vr,19:[1,83],20:$Ve,29:70,31:82,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{20:[1,84]},{20:[1,85]},{20:[1,86]},{19:[1,87],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},o($Vu,[2,38]),o($VN,[2,46]),o($VN,[2,47]),o($VN,[2,48]),{10:[1,105]},{10:$Vr,20:$Ve,29:70,31:106,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vr,20:$Ve,29:70,31:107,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vr,20:$Ve,29:70,31:108,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($VN,[2,65]),o($VN,[2,66]),o($VN,[2,67]),o($VN,[2,68]),o($VN,[2,69]),o($V9,[2,40]),o($V9,$Va,{30:$Vb}),o($V9,[2,42],{50:88,51:89,52:90,53:91,48:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM}),o($VN,$Vw,{20:$Vx,46:$Vy,54:$Vz}),o([19,20,22,25,46,47,48,54,60,61,62,63,64,65,66,67,68,69,70,71],$Vv),o($Vs,[2,21]),o($Vt,[2,23]),{19:[1,109],25:$V8},{10:$Vq,18:110,40:36},{10:$Vr,20:$Ve,29:70,31:111,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{19:[1,112]},{19:[1,113]},{10:[1,114]},{10:$Vr,20:$Ve,29:70,31:115,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($V5,[2,43],{42:55,43:56,44:57,57:64,29:70,41:116,31:117,10:$Vr,20:$Ve,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,58:$Vo,59:$Vp}),{19:[1,118],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},o($Vu,[2,31]),{10:$Vr,20:$Ve,29:70,31:119,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vr,20:$Ve,29:70,31:120,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:[1,121]},o($Vu,[2,37]),{10:$Vr,20:$Ve,29:70,31:122,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vr,20:$Ve,29:70,31:123,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vr,20:$Ve,29:70,31:124,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vr,20:$Ve,29:70,31:125,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($VO,[2,74]),o($VO,[2,75]),o($VO,[2,76]),o($VO,[2,72]),o($VO,[2,73]),o($VO,[2,77]),o($VO,[2,78]),o($VO,[2,79]),o($VO,[2,80]),o($VO,[2,81]),o($VO,[2,82]),o($VO,[2,70]),o($VO,[2,71]),o($VN,[2,52],{46:[1,126]}),o($VN,[2,53],{50:88,51:89,52:90,53:91}),o($VN,[2,54],{50:88,51:89,52:90,53:91}),{22:[1,127],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},o($Vu,[2,25]),{19:[1,128],25:$V8},{19:[1,129],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},o($Vu,[2,28]),o($Vu,[2,29]),o($VP,[2,63]),{47:[1,130],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},{22:[1,131],25:[1,132]},o($V5,[2,44],{50:88,51:89,52:90,53:91,48:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM}),o($Vu,[2,30]),{22:[1,133],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},{22:[1,134],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},{10:[1,135],39:[1,136]},o($VN,[2,55],{50:88,51:89,52:90,53:91}),o([19,22,25,47,48,60,61,62,66,67,68,69,70,71],[2,56],{50:88,51:89,52:90,53:91,63:$VE,64:$VF,65:$VG}),o([19,22,25,47,60,61,66,67,68,69,70,71],[2,57],{50:88,51:89,52:90,53:91,48:$VA,62:$VD,63:$VE,64:$VF,65:$VG}),o([19,22,25,47,60,61],[2,58],{50:88,51:89,52:90,53:91,48:$VA,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM}),{10:$Vr,20:$Ve,29:70,31:137,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($VN,[2,59]),o($Vu,[2,26]),o($Vu,[2,27]),o($VP,[2,64]),o($VN,[2,50]),{10:$Vr,20:$Ve,29:70,31:138,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vc,13:$V7,19:$Vd,20:$Ve,23:46,27:139,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{10:$Vc,13:$V7,19:$Vd,20:$Ve,23:46,27:140,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{39:[1,141]},{10:[1,142]},{47:[1,143],48:$VA,50:88,51:89,52:90,53:91,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM},o($V5,[2,45],{50:88,51:89,52:90,53:91,48:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG,66:$VH,67:$VI,68:$VJ,69:$VK,70:$VL,71:$VM}),o($Vt,[2,32],{36:[1,144]}),o($Vu,[2,34]),{10:[1,145]},{22:[1,146]},o($VN,[2,51]),{10:$Vc,13:$V7,19:$Vd,20:$Ve,23:46,27:147,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},{22:[1,148]},{10:$Vc,13:$V7,19:$Vd,20:$Ve,23:46,27:149,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($Vu,[2,33]),{10:$Vc,13:$V7,19:$Vd,20:$Ve,23:46,27:150,29:48,31:53,34:$Vf,35:$Vg,37:$Vh,38:$Vi,42:55,43:56,44:57,45:$Vj,48:$Vk,49:$Vl,55:$Vm,56:$Vn,57:64,58:$Vo,59:$Vp},o($Vu,[2,36]),o($Vu,[2,35])],
defaultActions: {2:[2,1],10:[2,2],14:[2,61]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = new Error();

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip line comments */
break;
case 2:/* skip block comments */
break;
case 3:return 58
break;
case 4:return 59
break;
case 5:return 35
break;
case 6:return 36
break;
case 7:return 37
break;
case 8:return 38
break;
case 9:return 45
break;
case 10:return 9
break;
case 11:return 34
break;
case 12:return 12
break;
case 13:return 55
break;
case 14:return 10
break;
case 15:return 56
break;
case 16:return 28
break;
case 17:return 32
break;
case 18:return 33
break;
case 19:return 63
break;
case 20:return 64
break;
case 21:return 48
break;
case 22:return 62
break;
case 23:return 66
break;
case 24:return 67
break;
case 25:return 68
break;
case 26:return 69
break;
case 27:return 70
break;
case 28:return 71
break;
case 29:return 30
break;
case 30:return 19
break;
case 31:return 39
break;
case 32:return 25
break;
case 33:return 54
break;
case 34:return 4
break;
case 35:return 49
break;
case 36:return 65
break;
case 37:return 60
break;
case 38:return 61
break;
case 39:return 20
break;
case 40:return 22
break;
case 41:return 47
break;
case 42:return 46
break;
case 43:return 13
break;
case 44:return 14
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/.*)/,/^(?:\/\*((\*+[^\/*])|([^*]))*\**\*\/)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:for\b)/,/^(?:new\b)/,/^(?:class\b)/,/^(?:return\b)/,/^(?:extends\b)/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][0-9a-zA-Z_]*)/,/^(?:L?"(\\.|[^\\"])*")/,/^(?:\[\])/,/^(?:\+\+)/,/^(?:--)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:<)/,/^(?:<=)/,/^(?:>)/,/^(?:>=)/,/^(?:==)/,/^(?:!=)/,/^(?:=)/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:\.)/,/^(?:$)/,/^(?:!)/,/^(?:%)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:\()/,/^(?:\))/,/^(?:\])/,/^(?:\[)/,/^(?:\{)/,/^(?:\})/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();