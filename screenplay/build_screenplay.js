const fs = require("fs");
const path = require("path");
const docx = require("docx");
const {
  AlignmentType,
  Document,
  Header,
  Packer,
  PageNumber,
  Paragraph,
  TextRun,
} = docx;

const FONT = "Courier New";
const SIZE = 24;
const OUT_FILE = path.join(__dirname, "tayang-yihou-screenplay.docx");

const ENABLE_SCENE_NUMBERS = true;
let sceneNumber = 0;

function slug(text) {
  let value = text.toUpperCase();
  if (ENABLE_SCENE_NUMBERS) {
    sceneNumber += 1;
    value = `${sceneNumber}  ${value}`;
  }
  return new Paragraph({
    spacing: { before: 360, after: 240, line: 240 },
    keepNext: true,
    children: [new TextRun({ text: value, font: FONT, size: SIZE, bold: true })],
  });
}

function action(text) {
  return new Paragraph({
    spacing: { before: 0, after: 160, line: 240 },
    children: [new TextRun({ text, font: FONT, size: SIZE })],
  });
}

function character(name) {
  return new Paragraph({
    spacing: { before: 240, after: 0, line: 240 },
    indent: { left: 3168 },
    keepNext: true,
    children: [new TextRun({ text: name.toUpperCase(), font: FONT, size: SIZE })],
  });
}

function dialogue(text) {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 240 },
    indent: { left: 1440, right: 2160 },
    children: [new TextRun({ text, font: FONT, size: SIZE })],
  });
}

function blank() {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 240 },
    children: [new TextRun({ text: "", font: FONT, size: SIZE })],
  });
}

function center(text, options = {}) {
  return new Paragraph({
    spacing: { before: options.before ?? 240, after: options.after ?? 240, line: 240 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text,
        font: FONT,
        size: options.size ?? SIZE,
        bold: !!options.bold,
      }),
    ],
  });
}

const screenplay = [
  blank(),
  blank(),
  center("打烊以后", { bold: true, size: 32 }),
  center("Hollywood Format Draft"),
  center("原创合家欢短片剧本", { after: 480 }),

  slug("INT. 潮玩旗舰店 - 晚"),
  action("人潮挤满前厅。"),
  action("拆盒声。扫码声。尖叫声。"),
  action("林麦抱着补货箱穿过去。贴标。扫码。把歪盒一一摆正。"),
  character("秦店长"),
  dialogue("快点。"),
  dialogue("明早九点，品牌直播巡店。"),
  action("他举起平板。屏幕上写着：零瑕疵橱窗计划。"),
  character("秦店长"),
  dialogue("压痕，撤。"),
  dialogue("偏色，撤。"),
  dialogue("挂件松，撤。"),
  action("林麦接过板夹。第一页最上面：小牙。盒角压皱。优先退仓。第二个名字：莓莓熊。表面旧磨损。移出主橱窗。"),
  character("秦店长"),
  dialogue("你试用期最后一周。"),
  dialogue("这面墙不好看，你也别太好看。"),
  action("林麦点头。她走到橱窗前。莓莓熊站在中央，旧粉色，笑得很稳。旁边的小牙盒角塌了一块，耳朵顶着透明罩。"),
  character("小女孩"),
  dialogue("妈妈，这只皱了。"),
  character("妈妈"),
  dialogue("换新的。"),
  action("林麦低头。她把小牙拿下，放进周转箱。小牙的笑，没变。"),

  slug("INT. 潮玩旗舰店 - 夜"),
  action("卷帘门落下。最后一批顾客离开。灯一排排熄灭。"),
  action("林麦抱着周转箱回前厅。她掏手机。黑屏。她去拉侧门。锁死了。她拍门。没人应。她回到收银台，抓起电话。没声。"),
  action("广播最后响一次。"),
  character("广播声"),
  dialogue("本店已停止营业。感谢光临。"),
  action("整家店静下来。林麦放下箱子，看一眼退仓单。红色的优先压在第一页。她靠着收银台坐下。电子钟跳到 11:59。货架一排排立着，像站军姿。"),
  action("电子钟跳到 12:00。滴。"),

  slug("INT. 潮玩旗舰店 - 深夜"),
  action("展柜里，一只玩偶眨眼。滴。第二只抬头。滴。整家店同时活过来。盒盖轻轻弹开。小车滑下导购台。棉花娃从价签后翻出来。"),
  action("奶昔队长带着小队跑过盲盒塔。"),
  character("奶昔"),
  dialogue("夜间提醒。"),
  dialogue("第一，不许乱跑。"),
  dialogue("第二，不许乱叫。"),
  dialogue("第三，人类如果要晕，请靠墙。"),
  action("林麦贴着货架，睁大眼。周转箱里，一只耳朵顶起盒盖。小牙先露耳朵，再露眼睛，最后整只翻上箱沿。他跳下来。"),
  character("小牙"),
  dialogue("还有人类没走？"),
  action("林麦一动不动。小牙也不动。僵了三秒。"),
  character("小牙"),
  dialogue("我重来。"),
  dialogue("欢迎来到打烊后的第二营业时段。"),
  character("林麦"),
  dialogue("你会说话。"),
  character("小牙"),
  dialogue("你会加班。"),
  action("奶昔带队冲过来。"),
  character("奶昔"),
  dialogue("异常。"),
  dialogue("发现人类。"),
  dialogue("初步判断，发呆型。"),
  character("林麦"),
  dialogue("我也可能是晕倒型。"),
  action("莓莓熊从橱窗里慢慢走出来，怀里抱着一颗塑料草莓灯。"),
  character("莓莓熊"),
  dialogue("可以晕。"),
  dialogue("但地刚拖过。"),

  slug("INT. 盲盒区夜市 - 深夜"),
  action("小牙一把抽走退仓单。林麦去抢。小牙转身就跑。"),
  character("小牙"),
  dialogue("这张纸今晚不能留。"),
  action("林麦追进去，猛地停住。夜市亮了。小灯串挂满货架缝。价签绳拉成跳绳。扭蛋壳拼成圆桌。贴纸铺成路。"),
  action("玩偶们换配件。传糖纸。拿废小票抽奖。"),
  character("小玩偶"),
  dialogue("今晚头奖，一张完整贴纸。"),
  character("另一个小玩偶"),
  dialogue("半张算热情奖吗？"),
  character("奶昔"),
  dialogue("半张不算奖。"),
  dialogue("但算热情。"),
  action("林麦看呆了。白天最整齐的一排陈列，夜里像一座小城。小牙把退仓单拍到空盒上。"),
  character("小牙"),
  dialogue("来。"),
  dialogue("看看谁又被系统嫌弃了。"),
  action("一群玩偶围上来。莓莓熊走近。"),
  character("莓莓熊"),
  dialogue("今晚比昨晚多。"),
  action("林麦低头看。不止小牙，不止莓莓熊，还有一排名字：盒损。偏色。旧磨损。挂件缺口。"),
  character("林麦"),
  dialogue("只是退仓。"),
  character("小牙"),
  dialogue("对白天，叫退仓。"),
  dialogue("对晚上，叫没了。"),

  slug("INT. 主橱窗 - 深夜"),
  action("莓莓熊把林麦带进橱窗。玻璃外是黑着的商场。玻璃里堆着旧价签、废丝带、落下的小票。这些零碎被折成小旗，挂成一圈。"),
  character("莓莓熊"),
  dialogue("夜里会发光的，不一定是新的。"),
  action("林麦看着那些她白天会扔掉的边角料。小牙跳上展示台。"),
  character("小牙"),
  dialogue("我不怕被买走。"),
  dialogue("被带回家，算升职。"),
  dialogue("我怕还没被选，先被判不够新。"),
  action("奶昔翻开夜巡册。"),
  character("奶昔"),
  dialogue("不合格，撤。"),
  dialogue("没位置，散。"),
  dialogue("散了，就没夜班。"),
  character("小牙"),
  dialogue("你这本册子，比店长还冷。"),
  character("奶昔"),
  dialogue("规矩不冷。"),
  dialogue("规矩只是没脸。"),
  character("莓莓熊"),
  dialogue("你们白天看整齐。"),
  dialogue("能不能也看看痕迹。"),
  character("林麦"),
  dialogue("我改名单，会丢工作。"),
  character("小牙"),
  dialogue("你不改，我们丢晚上。"),

  slug("INT. 后台仓库 - 深夜"),
  action("电脑屏亮起。库存系统打开。林麦坐下，输入工号。小牙蹲在键盘旁。莓莓熊守门。奶昔带队望风。"),
  action("林麦点开退仓页。红框弹出：零瑕疵橱窗计划已锁定。需店长二次授权。"),
  character("小牙"),
  dialogue("你们系统说话，像没睡醒。"),
  action("林麦点开另一页。又一条红框弹出：凌晨五点自动生成退仓码。生成后不可撤回。"),
  character("奶昔"),
  dialogue("五点。"),
  dialogue("我讨厌整数。"),
  action("林麦点开监控页。右上角提醒：06:30 提前联线巡检。"),
  character("林麦"),
  dialogue("不是九点。"),
  dialogue("他提前到。"),
  character("小牙"),
  dialogue("那简单。"),
  dialogue("偷删名单。"),
  character("奶昔"),
  dialogue("反对。"),
  dialogue("不体面。"),
  character("小牙"),
  dialogue("体面会被退。"),
  action("大家安静。莓莓熊慢慢开口。"),
  character("莓莓熊"),
  dialogue("不删。"),
  dialogue("改橱窗。"),

  slug("INT. 旧陈列角 - 深夜"),
  action("一块废弃陈列台藏在货架后。上面堆着断挂钩、裂塑封、旧宣传卡。"),
  action("小牙跳上去，翻出一张歪掉的笑脸贴。"),
  character("小牙"),
  dialogue("这个，是去年一个小孩贴的。"),
  action("他举起裂开的透明塑封。"),
  character("小牙"),
  dialogue("这个，是有人抢我时扯裂的。"),
  action("又举起一张旧小票。"),
  character("小牙"),
  dialogue("这个，是有人犹豫十分钟，最后还是没买我。"),
  action("林麦接过那块裂塑封，看向小牙的盒子。裂缝不小。"),
  character("小牙"),
  dialogue("白天他们说，隐藏款，快抢。"),
  dialogue("晚上系统说，盒损，快退。"),
  dialogue("我不是盒损。"),
  dialogue("我是经历丰富。"),
  action("林麦笑了。莓莓熊拿起自己的旧丝带。"),
  character("莓莓熊"),
  dialogue("我站橱窗太久，褪色了。"),
  dialogue("可那不是坏。"),
  dialogue("那是被看了很多次。"),
  character("林麦"),
  dialogue("如果不藏呢。"),
  character("小牙"),
  dialogue("什么。"),
  character("林麦"),
  dialogue("不藏裂缝。"),
  dialogue("不遮压痕。"),
  dialogue("不把它们修得像没活过。"),
  character("奶昔"),
  dialogue("你想把缺点摆前排。"),
  character("林麦"),
  dialogue("我想把痕迹摆前排。"),
  character("莓莓熊"),
  dialogue("这样像真的。"),

  slug("INT. 主橱窗 - 凌晨"),
  action("全店动起来。奶昔带队搬盒。棉花娃挂灯。小车送卡纸。"),
  action("三个小玩偶一起抬一张说明卡。卡太大。它们被卡拖着走。"),
  character("小牙"),
  dialogue("你们这是搬卡，还是被卡搬。"),
  character("三个小玩偶"),
  dialogue("帮忙！"),
  action("小牙转身就抬。林麦拆掉原本的标准陈列图。她把对称队列拆开。压角的，摆前排。偏色的，摆灯下。掉漆的，和主位摆一起。"),
  action("每只旁边都立一张小卡：挤皱一角，也在等你。晒旧一点，更像被抱过。不是瑕疵，是冒险证据。"),
  action("小牙抱着自己的盒子爬上高台。脚下一滑。盒子掉下去。林麦一把接住。盒底又裂开一点。"),
  character("小牙"),
  dialogue("完了。"),
  dialogue("我从经历丰富，变成长篇连载了。"),
  action("林麦把他摆到正中。"),
  character("林麦"),
  dialogue("那就站最中间。"),
  dialogue("最该被看见的，不是最完整的。"),
  action("小牙看着她，慢慢站进灯里。奶昔看了一眼，也把队里盒角最皱的一只推到前排。"),
  character("奶昔"),
  dialogue("临时修订条例。"),
  dialogue("今晚，皱角优先。"),

  slug("INT. 后台与前厅之间 - 凌晨"),
  action("对讲机突然响。秦店长的声音炸出来。"),
  character("秦店长"),
  dialogue("林麦，监控里怎么还有灯。"),
  action("全场一僵。林麦抓起对讲机。"),
  character("林麦"),
  dialogue("我在改直播陈列。"),
  character("秦店长"),
  dialogue("谁让你改的。"),
  character("林麦"),
  dialogue("顾客会喜欢这个。"),
  character("秦店长"),
  dialogue("我二十分钟后到。"),
  action("对讲机断掉。"),
  character("奶昔"),
  dialogue("二十分钟。"),
  dialogue("我讨厌倒计时。"),
  character("小牙"),
  dialogue("你上辈子输给过闹钟？"),
  character("奶昔"),
  dialogue("现在不是你发言的时候。"),
  action("莓莓熊看向时钟。04:41。林麦冲回后台，点开橱窗主题页。光标闪。主题名空着。"),
  character("小牙"),
  dialogue("叫经历丰富专区。"),
  character("林麦"),
  dialogue("像促销。"),
  character("小牙"),
  dialogue("那叫碰过也可爱。"),
  character("林麦"),
  dialogue("闭嘴。"),
  action("她打字：打烊以后。提交。屏幕弹出：等待店长审核。右下角还有一行小字：试运行预览。她点下去。"),
  action("全店橱窗灯忽然按新程序启动。主屏亮起一排字：打烊以后，每个小碰撞都还发光。"),

  slug("INT. 前厅 - 黎明前"),
  action("电梯门一开。秦店长快步进来。他抬头。整面橱窗已经亮透。莓莓熊站在中央。小牙坐在灯下。一整排原本要退的玩偶，被摆成了主角。"),
  character("秦店长"),
  dialogue("你疯了？"),
  character("林麦"),
  dialogue("你要直播。"),
  dialogue("观众要看的，不是一排没故事的盒子。"),
  action("秦店长看向那些小卡。又看向平板上的试播数据。后台弹幕预览往上跳：这组有意思。中间那只皱盒更可爱。像每只都有事发生过。"),
  character("秦店长"),
  dialogue("退仓码马上出。"),
  action("后台滴一声。所有人一起回头。04:59。又一声。05:00。系统开始生成。红框一格格亮起。小牙的编号排第一。奶昔攥紧小旗。小牙盯着屏幕，不说话了。"),
  action("林麦冲回后台。秦店长跟过去。"),
  character("秦店长"),
  dialogue("别乱碰系统。"),
  action("林麦抬手，直接拔掉标签打印机电源。机器停了。退仓码卡在一半。秦店长一愣。"),
  character("林麦"),
  dialogue("你要的是卖出去。"),
  dialogue("不是退干净。"),
  action("外面又叮一声。预约页跳出新数字。开门前预约上涨。秦店长看着数字，又看向橱窗，不说话了。"),
  character("小牙"),
  dialogue("他现在像系统卡住了。"),
  character("奶昔"),
  dialogue("禁止在紧张时刻讲得太准。"),

  slug("INT. 前厅 - 清晨开门前"),
  action("秦店长走回橱窗前。他看着主位上的小牙，看着旁边的说明卡，又看一眼莓莓熊旧掉的粉色。"),
  character("秦店长"),
  dialogue("这个主题，谁想的。"),
  character("林麦"),
  dialogue("我。"),
  action("小牙在盒里一动不动，像在偷听。秦店长盯着林麦。"),
  character("秦店长"),
  dialogue("你拿这些缺点做卖点。"),
  character("林麦"),
  dialogue("我拿它们活过的痕迹，做卖点。"),
  action("商场外有脚步声聚过来。第一批等开门的顾客到了。秦店长看一眼卷帘门，再看一眼后台预约数字，把平板扣下。"),
  character("秦店长"),
  dialogue("如果卖不动，这面墙你自己收。"),
  action("林麦点头。秦店长转身走向直播位。"),
  character("小牙"),
  dialogue("这算好消息吗。"),
  character("莓莓熊"),
  dialogue("算。"),
  character("奶昔"),
  dialogue("全员注意。"),
  dialogue("最后归位。"),
  dialogue("今天谁都不许在开门前三秒打喷嚏。"),
  character("小玩偶"),
  dialogue("我没有鼻子。"),
  character("奶昔"),
  dialogue("很好。"),
  dialogue("保持。"),

  slug("INT. 潮玩旗舰店 - 清晨开门"),
  action("卷帘门升起。第一批顾客涌进来。手机全对准新橱窗。"),
  character("小女孩"),
  dialogue("妈妈，这只像真的出去冒险过。"),
  character("妈妈"),
  dialogue("那就拿这只。"),
  character("女生"),
  dialogue("这个旧粉最好看。"),
  character("男生"),
  dialogue("像不是新的。"),
  dialogue("像陪过人。"),
  action("收银台那边喊起来：小牙这组快没了。莓莓熊主橱窗有人要整套。直播机位前，弹幕往上跳：不是完美，是有温度。皱盒那只最想要。这个主题会讲故事。"),
  action("秦店长站在旁边，盯着前厅。他看一眼林麦。"),
  character("秦店长"),
  dialogue("试用期结束了。"),
  dialogue("下次改方案，先报我。"),
  action("他说完，转身去直播。林麦站在原地，慢慢看向橱窗。莓莓熊回到静止，笑得还是很稳。小牙坐在灯下，一动不动。只有那道裂缝，被晨光照得更清楚。"),
  action("林麦走过去，把一张歪掉的小卡扶正。卡上写着：打烊以后，所有被挑剩下的，也在等一次被看见。"),
  action("她轻轻敲了敲玻璃。很轻。玻璃里的小牙当然没动。但那点坏笑，像比昨晚更明显了一点。"),
];

const doc = new Document({
  creator: "GitHub Copilot",
  title: "打烊以后",
  styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 2160 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ children: [PageNumber.CURRENT, "."], font: FONT, size: 22 }),
            ],
          }),
        ],
      }),
    },
    children: screenplay,
  }],
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_FILE, buffer);
  console.log(`wrote ${OUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
