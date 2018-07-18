function stepStatusConf(num){
	var status;
	switch(num) {
	case 0:
	  status = "进行";
	  break;
	case 1:
	  status = "进行";
	  break;
	case 2:
	  status = "成功";
	  break;
	case 3:
	  status = "跳过";
	  break;
	default:
	  status = "未完成";
	}
	return status;
}

var orderJourneyArray = [
	{stepName:'创建订单',stepStatus:"成功",stepId:0},
	{stepName:'泰国体检',stepStatus:"finish",stepId:1},
	{stepName:'行程确认',stepStatus:"finish",stepId:2},
	{stepName:'办理签证',stepStatus:"finish",stepId:3},
	{stepName:'直航泰国',stepStatus:"finish",stepId:4},
	{stepName:'入住酒店',stepStatus:"finish",stepId:5},
	{stepName:'支付全款',stepStatus:"finish",stepId:6},
	{stepName:'办理入院',stepStatus:"finish",stepId:7},
	{stepName:'进行手术',stepStatus:"finish",stepId:8},
	{stepName:'验孕确认',stepStatus:"finish",stepId:9},
	{stepName:'启程回国',stepStatus:"finish",stepId:10},
	{stepName:'孕期辅导',stepStatus:"finish",stepId:11}
];