window.onload=function(){

    waterfall('main','pin');

    var dataInt={'data':[{'src':'P_01.jpg'},{'src':'P_02.jpg'},
        {'src':'P_03.jpg'},{'src':'P_04.jpg'}]};

    window.onscroll=function(){
        if(checkscrollside()){
            var oParent = document.getElementById('main');// ��������
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div'); //��� Ԫ�ؽڵ�
                oPin.className='pin';                   //��� ���� name����
                oParent.appendChild(oPin);              //��� �ӽڵ�
                var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main','pin');
        };
    }
}

/*
 parend ����id
 pin Ԫ��id
 */
function waterfall(parent,pin){
    var oParent=document.getElementById(parent);// ��������
    var aPin=getClassObj(oParent,pin);// ��ȡ�洢���pin������aPin
    var iPinW=aPin[0].offsetWidth;// һ�����pin�Ŀ�
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//ÿ���������ɵ�pin���������ڿ�ȳ���һ������ȡ�
    oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//���ø���������ʽ������+�Զ�ˮƽ��߾�

    var pinHArr=[];//���ڴ洢 ÿ���е����п����ӵĸ߶ȡ�
    for(var i=0;i<aPin.length;i++){//��������aPin��ÿ�����Ԫ��
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH; //��һ���е�num�����pin ����ӽ�����pinHArr
        }else{
            var minH=Math.min.apply(null,pinHArr);//����pinHArr�е���СֵminH
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position='absolute';//���þ���λ��
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            //���� ��С��Ԫ�صĸ� + ����ϵ�aPin[i]����
            pinHArr[minHIndex]+=aPin[i].offsetHeight;//��������˿�����и�
        }
    }
}

/****
 *ͨ����������Ԫ�ص�class�� ��ȡ��ͬ����Ԫ�ص�����
 */
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//��ȡ �����������Ӽ�
    var pinS=[];//����һ������ �����ռ���Ԫ��
    for (var i=0;i<obj.length;i++) {//������Ԫ�ء��ж����ѹ������
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
/****
 *��ȡ pin�߶� ��Сֵ������index
 */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}


function checkscrollside(){
    var oParent=document.getElementById('main');
    var aPin=getClassObj(oParent,'pin');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//������������ӿ����waterfall()���ĸ߶ȣ����һ�����ľ�����ҳ����+����ߵ�һ��(ʵ��δ�����׾Ϳ�ʼ����)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//ע����������
    var documentH=document.documentElement.clientHeight;//ҳ��߶�
    return (lastPinH<scrollTop+documentH)?true:false;//����ָ���߶Ⱥ� ����true������waterfall()����
}