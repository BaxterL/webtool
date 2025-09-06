$(function(){
    var QRBox = $('#QRBox');
    var MainBox = $('#MainBox');
    var WeChanQR = './img/wechatqr.png';
    var QQQR = './img/qqqr.png';

    function showQR(QR) {
        if (QR) {
            MainBox.css({
                'background-image': 'url(' + QR + ')',
                'background-size': 'contain',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'background-color': '#fff',
            });
        }
        $('#DonateText,#donateBox,#github').addClass('blur');
        QRBox.fadeIn(300, function () {
            MainBox.addClass('showQR');
        });
    }

    $('#donateBox>li').click(function () {
        var thisID = $(this).attr('id');
        if (thisID === 'WeChat') {
            showQR(WeChanQR);
        } else if (thisID === 'QQ') {
            showQR(QQQR);
        }
    });

    MainBox.click(function () {
        MainBox.removeClass('showQR').addClass('hideQR');
        setTimeout(function () {
            QRBox.fadeOut(300, function () {
                MainBox.removeClass('hideQR');
            });
            $('#DonateText,#donateBox,#github').removeClass('blur');
        }, 600);
    });

    const musicConfig = {
        title: 'パノプティコン',
        author: 'キタニタツヤ',
        url: './music/music.mp3',
        pic: './img/tm.png',
        lrc: `
[00:22.61]どうなってんだよこれ！
[00:24.67]鉄柵の奥の道化を笑ってたはずが
[00:27.43]目を覚ましたら自分の番なんてさ、笑えないね
[00:32.04]斬奸状は後回し
[00:33.80]誰も彼も正義を持て余している
[00:36.46]青白い顔の群れは怯えた眼をしていた
[00:41.68]切り離されて人肌を忘れてしまった僕らの
[00:49.90]心がいつか機能不全を起こしてしまった
[00:59.01]七十億と少しの孤独が寄り集まって
[01:02.88]猜疑心だけが募って、この手は冷え切ってしまった
[01:07.78]パノプティコンの向こうで歪んだ笑い声が聞こえる気がした
[01:13.14]排気ガス塗れの僕らの頭上、救いの糸は無いんだ
[01:37.01]善意でできた道がどうやら地獄の方へと続いてた、なんて
[01:42.19]ずっと前からわかっていたんだ
[01:44.29]無邪気さゆえ手がつけれないんだ
[01:46.61]孤独を自ら招いて自壊する
[01:49.61]致命的なバグを抱えた僕らの業は
[01:52.73]百年足らずじゃ清算できないね
[01:56.00]もつれた足で彷徨うことを止め、地下室へ逃げても
[02:04.38]テレスクリーンから無数の眼に覗かれているんだ
[02:13.52]七十億と少しの孤独が寄り集まって
[02:17.57]誰も信じれなくなって、温もりを忘れてしまった
[02:22.29]パノプティコンの向こうで歪んだ笑い声が聞こえる気がした
[02:27.77]蓮の花の上に座した悪意
[02:30.31]蜘蛛は潰されていたんだ
[02:41.73]正義の奴隷になって些末な悪に火を放っていた彼らもまた、
[02:46.23]ガス室へ消えていく
[02:49.89]どこから見ているの？
[02:51.96]きっと途方もない悪意を孕んでいるんだろう？
[02:58.96]七十億と少しの孤独が寄り集まって
[03:02.92]猜疑心だけが募って、この手は冷え切ってしまった
[03:07.69]パノプティコンの向こうで歪んだ笑い声が聞こえる気がした
[03:13.17]誰かがあの蜘蛛を徒に踏み潰したその日から
[03:17.63]排気ガス塗れの僕らの頭上、救いの糸は無いんだ
`
    };

    let ap3 = new APlayer({
        element: document.getElementById('player3'),
        narrow: false,
        autoplay: false,
        showlrc: true,
        preload: 'auto',
        music: {
            title: musicConfig.title,
            author: musicConfig.author,
            url: musicConfig.url,
            pic: musicConfig.pic,
            lrc: musicConfig.lrc
        }
    });
    ap3.init();

    //主题切换
    let _Blog = window._Blog || {};
    const currentTheme = window.localStorage && window.localStorage.getItem('theme');
    const isDark = currentTheme === 'dark';
    document.getElementById("switch_default").checked = isDark;
    _Blog.toggleTheme = function () {
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            window.localStorage && window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    };
    _Blog.toggleTheme();

    // 跟随系统夜间模式
    function setThemeBySystem() {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-theme', isDark);
        document.getElementById("switch_default").checked = isDark;
    }
    setThemeBySystem();
    // 监听系统主题变化
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBySystem);
    }
    // 用户手动切换
    document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        // 不再强制写入localStorage，完全跟随系统和用户手动切换
    });
});
