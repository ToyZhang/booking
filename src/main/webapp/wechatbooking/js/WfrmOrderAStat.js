function DelItem(count) {
	
	            $.post("DelHotelItem.ashx", { itemID: count,itemClass:'客房设施' }, function (msg) {
	
	                if (msg == "ok") {
	                    alert("删除成功！");
	
	                    window.location.reload();
	                }
	
	            }, "text");
	        }
	
	        function DelItem1(count) {
	
	            $.post("DelHotelItem.ashx", { itemID: count ,itemClass:'综合设施'}, function (msg) {
	
	                if (msg == "ok") {
	                    alert("删除成功！");
	
	                    window.location.reload();
	                }
	
	            }, "text");
	        }
	
	        function DelItem2(count) {
	
	            $.post("DelHotelItem.ashx", { itemID: count ,itemClass:'服务项目'}, function (msg) {
	
	                if (msg == "ok") {
	                    alert("删除成功！");
	
	                    window.location.reload();
	                }
	
	            }, "text");
	        }
	
	        function DelItem3(count) {
	
	            $.post("DelHotelItem.ashx", { itemID: count ,itemClass:'娱乐设施'}, function (msg) {
	
	                if (msg == "ok") {
	                    alert("删除成功！");
	
	                    window.location.reload();
	                }
	
	            }, "text");
	        }
	
	        var count = <%=lastIndex  %>;
	
	        var count1 = <%=lastIndex1  %>;
	
	        var count2 = <%=lastIndex2  %>;
	
	        var count3 = <%=lastIndex3  %>;
	
	        function Add() {
	
	            count++;
	
	            var div = $("<div id='myDiv" + count + "'><div class='am-input-group am-u-sm-8 am-input-group-primary'><span class='am-input-group-label'><i class='am-icon-hotel am-icon-fw'></i></span><div id='titlePanel" + count + "'><input type='text' id='itemTitle" + count + "' class='am-form-field' placeholder='项目名称'></div><span class='am-input-group-label'><i class='am-icon-bookmark am-icon-fw'></i></span><div id='despPanel" + count + "'><input type='text' id='itemDesp" + count + "' class='am-form-field' placeholder='项目备注'></div></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick=Save('" + count + "') id='btnSave" + count + "' class='am-btn am-btn-primary'><span class='am-icon-check'></span> 确认</button></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick='Remove(" + count + ")' id='btnRemove" + count + "' class='am-btn am-btn-default'><span class='am-icon-close'></span> 取消</button></div><br/><br/><br/></div>");
	
	            $("#myPanel").append(div);
	
	        }
	
	        function Add1() {
	
	            count1++;
	
	            var div = $("<div id='myDiv1" + count1 + "'><div class='am-input-group am-u-sm-8 am-input-group-primary'><span class='am-input-group-label'><i class='am-icon-hotel am-icon-fw'></i></span><div id='titlePanel1" + count1 + "'><input type='text' id='itemTitle1" + count1 + "' class='am-form-field' placeholder='项目名称'></div><span class='am-input-group-label'><i class='am-icon-bookmark am-icon-fw'></i></span><div id='despPanel1" + count1 + "'><input type='text' id='itemDesp1" + count1 + "' class='am-form-field' placeholder='项目备注'></div></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick=Save1('" + count1 + "') id='btnSave1" + count1 + "' class='am-btn am-btn-primary'><span class='am-icon-check'></span> 确认</button></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick='Remove1(" + count1 + ")' id='btnRemove1" + count1 + "' class='am-btn am-btn-default'><span class='am-icon-close'></span> 取消</button></div><br/><br/><br/></div>");
	
	            $("#myPanel1").append(div);
	
	        }
	
	        function Add2() {
	
	            count2++;
	
	            var div = $("<div id='myDiv2" + count2 + "'><div class='am-input-group am-u-sm-8 am-input-group-primary'><span class='am-input-group-label'><i class='am-icon-hotel am-icon-fw'></i></span><div id='titlePanel2" + count2 + "'><input type='text' id='itemTitle2" + count2 + "' class='am-form-field' placeholder='项目名称'></div><span class='am-input-group-label'><i class='am-icon-bookmark am-icon-fw'></i></span><div id='despPanel2" + count2 + "'><input type='text' id='itemDesp2" + count2 + "' class='am-form-field' placeholder='项目备注'></div></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick=Save2('" + count2 + "') id='btnSave2" + count2 + "' class='am-btn am-btn-primary'><span class='am-icon-check'></span> 确认</button></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick='Remove2(" + count2 + ")' id='btnRemove2" + count2 + "' class='am-btn am-btn-default'><span class='am-icon-close'></span> 取消</button></div><br/><br/><br/></div>");
	
	            $("#myPanel2").append(div);
	
	        }
	
	        function Add3() {
	
	     
	
	            count3++;
	
	            var div = $("<div id='myDiv3" + count3 + "'><div class='am-input-group am-u-sm-8 am-input-group-primary'><span class='am-input-group-label'><i class='am-icon-hotel am-icon-fw'></i></span><div id='titlePanel3" + count3 + "'><input type='text' id='itemTitle3" + count3 + "' class='am-form-field' placeholder='项目名称'></div><span class='am-input-group-label'><i class='am-icon-bookmark am-icon-fw'></i></span><div id='despPanel3" + count3 + "'><input type='text' id='itemDesp3" + count3 + "' class='am-form-field' placeholder='项目备注'></div></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick=Save3('" + count3 + "') id='btnSave3" + count3 + "' class='am-btn am-btn-primary'><span class='am-icon-check'></span> 确认</button></div><div class='am-input-group am-u-sm-1 am-input-group-primary'><button type='button' onclick='Remove3(" + count3 + ")' id='btnRemove3" + count3 + "' class='am-btn am-btn-default'><span class='am-icon-close'></span> 取消</button></div><br/><br/><br/></div>");
	
	            $("#myPanel3").append(div);
	
	        }
	
	        function Save(count) {
	
	            if ($("#itemTitle" + count).val() == "") {
	                return false;
	            }
	
	            if ($("#btnSave" + count).text() == " 确认") {
	
	                var animation = 'am-animation-scale-up am-btn am-btn-primary';
	
	                $("#btnSave" + count).removeClass().addClass(animation);
	
	                var titleVal = $("#itemTitle" + count).val();
	
	                var despVal = $("#itemDesp" + count).val() == "" ? " 空 " : $("#itemDesp" + count).val();
	
	                $.post("SaveHotelItem.ashx", { itemTitle: titleVal, itemDesp: despVal, itemClass: '客房设施', itemID: count }, function (msg) {
	                    if (msg == "OK") {
	
	                        $("#itemTitle" + count).remove();
	
	                        $("#itemDesp" + count).remove();
	
	                        var titleRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + titleVal + "</a></div>";
	
	                        var despRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + despVal + "</a></div>";
	
	
	                        $("#titlePanel" + count).append(titleRes);
	
	                        $("#despPanel" + count).append(despRes);
	
	
	                         $("#btnSave" + count).hide();
	
	                        $("#btnSave" + count).text("编辑").click(function () {
	
	
	                        alert("编辑事件");
	
	                            if ($("#btnSave" + count).text() == "编辑") {
	
	                                alert("编辑事件");
	                            }
	
	                        });
	
	                        $("#btnRemove" + count).text("删除").click(function () {
	
	                            if ($("#btnRemove" + count).text() == "删除") {
	
	                                //删除事件
	
	                                alert('dsf');
	
	                                $.post("DelHotelItem.ashx", { itemID: count,itemClass:'客房设施' }, function (msg) {
	
	                                alert(msg);
	
	                                    if (msg == "ok") {
	                                        alert("删除成功！");
	
	                                        window.location.reload();
	                                    }   else {
	      alert(msg);
	}
	
	                                }, "text");
	
	                            }
	
	                        });
	
	                        $("#btnRemove" + count).html("<span class='am-icon-close'></span> 删除");
	                    }
	                    else {
	
	                        alert(msg);
	
	                    }
	
	                }, "text");
	
	
	            }
	            else {
	
	            }
	
	
	        }
	
	        function Remove(count) {
	
	
	            if ($("#btnRemove" + count).text() == " 取消") {
	
	                var myDiv = $("#myDiv" + count);
	
	                myDiv.remove();
	
	            }
	
	
	
	        }
	
	        function Save1(count) {   
	         
	            if ($("#itemTitle1" + count1).val() == "") {
	
	                return false;            
	
	            }
	
	            if ($("#btnSave1" + count1).text() == " 确认") {  
	
	                var animation = 'am-animation-scale-up am-btn am-btn-primary';
	
	                $("#btnSave1" + count1).removeClass().addClass(animation);
	
	                var titleVal = $("#itemTitle1" + count1).val();
	
	                var despVal = $("#itemDesp1" + count1).val() == "" ? " 空 " : $("#itemDesp1" + count1).val();
	
	                $.post("SaveHotelItem.ashx", { itemTitle: titleVal, itemDesp: despVal, itemClass: '综合设施', itemID: count1 }, function (msg) {
	                    if (msg == "OK") {
	
	                        $("#itemTitle1" + count1).remove();
	
	                        $("#itemDesp1" + count1).remove();
	
	                        var titleRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + titleVal + "</a></div>";
	
	                        var despRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + despVal + "</a></div>";
	
	                        $("#titlePanel1" + count1).append(titleRes);
	
	                        $("#despPanel1" + count1).append(despRes);
	
	                        $("#btnSave1" + count).hide();                        
	
	                        $("#btnSave1" + count1).text("编辑").click(function () {
	
	                            if ($("#btnSave1" + count1).text() == "编辑") {
	
	                                alert("编辑事件");
	                            }
	
	                        });
	
	                        $("#btnRemove1" + count1).text("删除").click(function () {
	
	                            if ($("#btnRemove1" + count1).text() == "删除") {
	
	                                //删除事件
	
	                                $.post("DelHotelItem.ashx", { itemID: count1,itemClass:'综合设施' }, function (msg) {
	
	                                    if (msg == "ok") {
	                                        alert("删除成功！");
	
	                                        window.location.reload();
	                                    }   else {
	      alert(msg);
	}
	
	                                }, "text");
	
	                            }
	
	                        });
	
	                        $("#btnRemove1" + count).html("<span class='am-icon-close'></span> 删除");
	                    }
	                    else {
	
	                        alert(msg);
	
	                    }
	
	                }, "text");
	            }
	            else {
	
	            }
	        }
	
	        function Save2(count) {
	
	
	            if ($("#itemTitle2" + count2).val() == "") {
	                return false;
	            }
	
	            if ($("#btnSave2" + count2).text() == " 确认") {  
	
	                var animation = 'am-animation-scale-up am-btn am-btn-primary';
	
	                $("#btnSave2" + count2).removeClass().addClass(animation);
	
	                var titleVal = $("#itemTitle2" + count2).val();
	
	                var despVal = $("#itemDesp2" + count2).val() == "" ? " 空 " : $("#itemDesp2" + count2).val();
	
	                $.post("SaveHotelItem.ashx", { itemTitle: titleVal, itemDesp: despVal, itemClass: '服务项目', itemID: count2 }, function (msg) {
	                    if (msg == "OK") {
	
	                        $("#itemTitle2" + count2).remove();
	
	                        $("#itemDesp2" + count2).remove();
	
	                        var titleRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + titleVal + "</a></div>";
	
	                        var despRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + despVal + "</a></div>";
	
	
	                        $("#titlePanel2" + count2).append(titleRes);
	
	                        $("#despPanel2" + count2).append(despRes);
	
	                        $("#btnSave2" + count).hide();
	
	                        $("#btnSave2" + count2).text("编辑").click(function () {
	
	                            if ($("#btnSave2" + count2).text() == "编辑") {
	
	                                alert("编辑事件");
	                            }
	
	                        });
	
	                        $("#btnRemove2" + count2).text("删除").click(function () {
	
	                            if ($("#btnRemove2" + count2).text() == "删除") {
	
	                                //删除事件
	
	                                $.post("DelHotelItem.ashx", { itemID: count2,itemClass:'服务项目' }, function (msg) {
	
	                                    if (msg == "ok") {
	                                        alert("删除成功！");
	
	                                        window.location.reload();
	                                    }   else {
	      alert(msg);
	}
	
	                                }, "text");
	
	                            }
	
	                        });
	
	                        $("#btnRemove2" + count).html("<span class='am-icon-close'></span> 删除");
	                    }
	                    else {
	
	                        alert(msg);
	
	                    }
	
	                }, "text");
	
	
	            }
	            else {
	
	            }
	
	
	        }
	
	        function Save3(count) {
	
	
	            if ($("#itemTitle3" + count3).val() == "") {
	
	                return false;
	
	            }
	
	            if ($("#btnSave3" + count3).text() == " 确认") {            
	       
	
	                var animation = 'am-animation-scale-up am-btn am-btn-primary';
	
	                $("#btnSave3" + count3).removeClass().addClass(animation);
	
	                var titleVal = $("#itemTitle3" + count3).val();
	
	                var despVal = $("#itemDesp3" + count3).val() == "" ? " 空 " : $("#itemDesp3" + count3).val();
	
	                $.post("SaveHotelItem.ashx", { itemTitle: titleVal, itemDesp: despVal, itemClass: '娱乐设施', itemID: count3 }, function (msg) {
	                    if (msg == "OK") {
	
	                        $("#itemTitle3" + count3).remove();
	
	                        $("#itemDesp3" + count3).remove();
	
	                        var titleRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + titleVal + "</a></div>";
	
	                        var despRes = "<div class='am-btn-group am-btn-group-justify'><a class='am-btn am-btn-default am-text-left' role='button'>" + despVal + "</a></div>";
	
	
	                        $("#titlePanel3" + count3).append(titleRes);
	
	                        $("#despPanel3" + count3).append(despRes);
	
	                         $("#btnSave3" + count).hide();
	
	                        $("#btnSave3" + count3).text("编辑").click(function () {
	
	                            if ($("#btnSave3" + count3).text() == "编辑") {
	
	                                alert("编辑事件");
	                            }
	
	                        });
	
	                        $("#btnRemove3" + count3).text("删除").click(function () {
	
	                            if ($("#btnRemove3" + count3).text() == "删除") {
	
	                                //删除事件
	
	                                $.post("DelHotelItem.ashx", { itemID: count3,itemClass:'娱乐设施' }, function (msg) {
	
	                                    if (msg == "ok") {
	                                        alert("删除成功！");
	
	                                        window.location.reload();
	                                    }
	                                    else {
	      alert(msg);
	}
	
	                                }, "text");
	
	                            }
	
	                        });
	
	                       $("#btnRemove3" + count).html("<span class='am-icon-close'></span> 删除");
	                    }
	                    else {
	
	                        alert(msg);
	
	                    }
	
	                }, "text");
	
	
	            }
	            else {
	
	            }
	
	
	        }
	
	        function Remove1(count) {
	
	
	            if ($("#btnRemove1" + count).text() == " 取消") {
	
	                var myDiv = $("#myDiv1" + count);
	
	                myDiv.remove();
	
	            }
	
	
	
	        }
	
	        function Remove2(count) {
	
	
	            if ($("#btnRemove2" + count).text() == " 取消") {
	
	                var myDiv = $("#myDiv2" + count);
	
	                myDiv.remove();
	
	            }
	
	
	
	        }
	
	        function Remove3(count) {
	
	
	            if ($("#btnRemove3" + count).text() == " 取消") {
	
	                var myDiv = $("#myDiv3" + count);
	
	                myDiv.remove();
	
	            }
	
	
	
	        }
	
	        function logout() {
	
	            $.get("Logout.ashx", {}, function (msg) {
	
	                if (msg == "ok") {
	
	                    window.location.reload();
	
	                }
	                else {
	
	                    alert(msg);
	
	                }
	
	            }, "text");
	
	        }