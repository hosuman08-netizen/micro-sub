
/* LEGION_WAVE_26_today_counter */
try{var _dk=new Date().toDateString();var _o=JSON.parse(localStorage.getItem('lw_p32_micro_su_today_counter')||'{}');if(_o.d!==_dk)_o={d:_dk,n:0};_o.n=(_o.n||0)+1;localStorage.setItem('lw_p32_micro_su_today_counter',JSON.stringify(_o));}catch(e){}

try{if(!sessionStorage.getItem('ms_v')){sessionStorage.setItem('ms_v','1'); localStorage.setItem('ms_days', (+(localStorage.getItem('ms_days')||0))+ (localStorage.getItem('ms_last')===new Date().toDateString()?0:1)); localStorage.setItem('ms_last', new Date().toDateString());}}catch(e){}
(function(){
  var tiers=[{n:'Free',p:0,f:['기본 피드','광고 포함']},{n:'Plus',p:4900,f:['광고 제거','주간 드롭','북마크']},{n:'Elite',p:14900,f:['전체 드롭','DM 우선','얼리 액세스']}];
  var PERKS=[{l:'기본 피드',has:['Free','Plus','Elite']},{l:'광고 제거',has:['Plus','Elite']},{l:'주간 드롭',has:['Plus','Elite']},{l:'북마크',has:['Plus','Elite']},{l:'얼리·DM',has:['Elite']}];
  var TIER_R={Free:0,Plus:1,Elite:2};
  /* GOLD50 TOP3: Twitch/YT 티어 배지 시각. 결제/MRR 아님 */
  var BADGE={
    Free:{e:'⚪',c:'#94a3b8',bg:'#1c1826'},
    Plus:{e:'⭐',c:'#e0b552',bg:'#2a2310'},
    Elite:{e:'💎',c:'#c4b5fd',bg:'#1e1730'}
  };
  function badgeHtml(n){
    var b=BADGE[n]||BADGE.Free;
    return '<span class="chip" style="background:'+b.bg+';color:'+b.c+';border:1px solid '+b.c+'66;font-weight:800">'+b.e+' '+n+'</span>';
  }
  function ymDay(dd){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(dd).padStart(2,'0');}
  function monthLabel(){var d=new Date();return d.getFullYear()+'년 '+(d.getMonth()+1)+'월';}
  var DROPS=[{n:'Free',r:0,date:ymDay(1),title:'공개 피드 하이라이트'},{n:'Plus',r:1,date:ymDay(5),title:'주간 드롭 · 멤버 노트'},{n:'Elite',r:2,date:ymDay(3),title:'얼리 액세스 비하인드'}];
  function dropOf(n){var x=DROPS.filter(function(d){return d.n===n;})[0]; return x?x.date+' · '+x.title:'';}
  function dropListHtml(curN){
    var rank=TIER_R[curN]||0;
    var rows=DROPS.slice().sort(function(a,b){return a.date<b.date?-1:1;});
    return rows.map(function(d){
      var open=rank>=d.r;
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #2a2438">'
        +'<div><div style="font-size:13px">'+(open?'':'🔒 ')+d.title+'</div>'
        +'<div class="sub" style="margin:2px 0 0">'+d.date+' · '+d.n+'</div></div>'
        +'<span class="chip">'+(open?'열림':'잠김')+'</span></div>';
    }).join('');
  }
  /* WAVE38: Patreon-style past-drop archive. Local titles only — no MRR/subs. */
  var archOpen=false;
  function ymOf(off){
    var d=new Date(); d.setDate(1); d.setMonth(d.getMonth()+off);
    return {
      label:d.getFullYear()+'년 '+(d.getMonth()+1)+'월',
      prefix:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')
    };
  }
  function archiveList(){
    var titles={Free:'공개 하이라이트',Plus:'멤버 노트',Elite:'비하인드'};
    var days={Free:'01',Plus:'05',Elite:'03'};
    var out=[];
    [-1,-2].forEach(function(off){
      var ym=ymOf(off);
      ['Free','Plus','Elite'].forEach(function(n){
        out.push({n:n,r:TIER_R[n],date:ym.prefix+'-'+days[n],title:titles[n]+' · '+ym.label});
      });
    });
    return out;
  }
  /* WAVE50: archive month chips. Local titles only — no MRR/subs. */
  function archMonth(){try{return localStorage.getItem('msc_arch_m')||'all';}catch(e){return 'all';}}
  /* WAVE57: archive tier chips. Virtual titles only — no MRR/subs. */
  function archTier(){try{return localStorage.getItem('msc_arch_t')||'all';}catch(e){return 'all';}}
  /* WAVE63: hide locked archive rows. Filter only — not cancel hide. */
  function archHideLock(){try{return localStorage.getItem('msc_arch_hide')==='1';}catch(e){return false;}}
  function archiveFiltered(curN){
    var rank=TIER_R[curN]||0;
    var m=archMonth();
    var t=archTier();
    var list=archiveList();
    if(m==='-1'||m==='-2'){
      var ym=ymOf(Number(m));
      list=list.filter(function(d){return String(d.date).indexOf(ym.prefix)===0;});
    }
    if(t==='Free'||t==='Plus'||t==='Elite') list=list.filter(function(d){return d.n===t;});
    if(archHideLock()) list=list.filter(function(d){return rank>=d.r;});
    return list;
  }
  function archiveHtml(curN){
    var rank=TIER_R[curN]||0;
    var list=archiveFiltered(curN);
    var rows=list.map(function(d){
      var open=rank>=d.r;
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #2a2438">'
        +'<div><div style="font-size:13px">'+(open?'':'🔒 ')+d.title+'</div>'
        +'<div class="sub" style="margin:2px 0 0">'+d.date+' · '+d.n+'</div></div>'
        +'<span class="chip">'+(open?'열림':'잠김')+'</span></div>';
    }).join('');
    return (rows||'<p class="sub" style="margin:8px 0">'+(archHideLock()?'잠긴 드롭 숨김':'이 달 기록 없음')+'</p>');
  }
  /* WAVE69: open-only archive CSV. Title/date/tier — no MRR, no revenue. */
  function csvCell(v){
    var s=String(v==null?'':v);
    if(/[",\n\r]/.test(s)) return '"'+s.replace(/"/g,'""')+'"';
    return s;
  }
  function archiveOpenCsv(curN){
    var rank=TIER_R[curN]||0;
    var list=archiveFiltered(curN).filter(function(d){return rank>=d.r;});
    var lines=['title,date,tier'];
    list.forEach(function(d){
      lines.push([d.title,d.date,d.n].map(csvCell).join(','));
    });
    return lines.join('\n');
  }
  /* WAVE74: open CSV row count 1-line. No MRR, no revenue. */
  function archiveOpenCount(curN){
    var rank=TIER_R[curN]||0;
    return archiveFiltered(curN).filter(function(d){return rank>=d.r;}).length;
  }
  /* WAVE78: CSV filename includes month + tier filter. No MRR/revenue. */
  function archiveCsvName(){
    var m=archMonth();
    var t=archTier();
    var month='all';
    if(m==='-1'||m==='-2') month=ymOf(Number(m)).prefix;
    var tier=(t==='Free'||t==='Plus'||t==='Elite')?t:'all';
    return 'msc-archive-open-'+month+'-'+tier+'.csv';
  }
  function exportArchiveCsv(curN){
    var csv=archiveOpenCsv(curN);
    try{
      var blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a'); a.href=url; a.download=archiveCsvName();
      document.body.appendChild(a); a.click();
      if(a.parentNode) a.parentNode.removeChild(a);
      setTimeout(function(){try{URL.revokeObjectURL(url);}catch(e){}},400);
    }catch(e){
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(csv);
    }
  }
  function archMonthChips(){
    var cur=archMonth();
    function chip(v,label){
      var on=cur===v;
      return '<button type="button" class="sec" data-am="'+v+'" style="flex:1;'+(on?'border-color:#e0b552;color:#e0b552;font-weight:800':'')+'">'+label+'</button>';
    }
    function mon(off){return String(parseInt(ymOf(off).prefix.split('-')[1],10))+'월';}
    return '<div id="archM" class="row" style="margin:8px 0 4px;gap:6px">'
      +chip('all','전체')
      +chip('-1',mon(-1))
      +chip('-2',mon(-2))
      +'</div>';
  }
  function archTierChips(){
    var cur=archTier();
    function chip(v,label){
      var on=cur===v;
      return '<button type="button" class="sec" data-at="'+v+'" style="flex:1;'+(on?'border-color:#e0b552;color:#e0b552;font-weight:800':'')+'">'+label+'</button>';
    }
    return '<div id="archT" class="row" style="margin:4px 0 4px;gap:6px">'
      +chip('all','전체')
      +chip('Free','Free')
      +chip('Plus','Plus')
      +chip('Elite','Elite')
      +'</div>';
  }
  function archHideChips(){
    var on=archHideLock();
    function chip(v,label,active){
      return '<button type="button" class="sec" data-ah="'+v+'" style="flex:1;'+(active?'border-color:#e0b552;color:#e0b552;font-weight:800':'')+'">'+label+'</button>';
    }
    return '<div id="archH" class="row" style="margin:4px 0 4px;gap:6px">'
      +chip('0','잠김 포함',!on)
      +chip('1','잠김 숨김',on)
      +'</div>';
  }
  var root=document.getElementById('app');
  var cur=localStorage.getItem('msc_tier')||'Free';
  /* WAVE45: Patreon/Ko-fi drop notify toggle. Local only — no push, no MRR. */
  function dropNOn(){try{return localStorage.getItem('msc_drop_n')==='1';}catch(e){return false;}}
  function nextDropLine(curN){
    var d=DROPS.filter(function(x){return x.n===curN;})[0]||DROPS[0];
    var today=dayKey(0);
    if(d.date>=today) return d.date+' · '+d.title;
    var nd=new Date(); nd.setMonth(nd.getMonth()+1);
    var dayN=parseInt(String(d.date).slice(-2),10)||1;
    nd.setDate(dayN);
    var ds=nd.getFullYear()+'-'+String(nd.getMonth()+1).padStart(2,'0')+'-'+String(nd.getDate()).padStart(2,'0');
    return ds+' · '+d.title;
  }
  function retainLine(n){
    var t=tiers.filter(function(x){return x.n===n;})[0]||tiers[0];
    if(n==='Free') return 'Keep 다음: Plus 광고제거 · 주간드롭 · 북마크 · 숨김취소 없음';
    return 'Keep '+n+': '+t.f.join(' · ')+' · 숨김취소 없음';
  }
  /* GOLD50 TOP5: Memberful/Stripe Keep/Down. 숨김취소 금지 — 두 버튼 항상 같이. */
  var cancelOpen=false;
  function dayKey(off){var d=new Date();d.setDate(d.getDate()+(off||0));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function eliteLeft(){var e=new Date();e.setHours(24,0,0,0);var ms=Math.max(0,e-Date.now());var h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000);return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');}
  function hist(){try{return JSON.parse(localStorage.getItem('msc_hist')||'[]');}catch(e){return[];}}
  function bumpStreak(){
    try{
      var st=JSON.parse(localStorage.getItem('msc_streak')||'{}');
      var t=dayKey(0); if(st.last===t) return st.count||0;
      st.count=(st.last===dayKey(-1))?(st.count||0)+1:1; st.last=t;
      localStorage.setItem('msc_streak',JSON.stringify(st));
      return st.count;
    }catch(e){return 0;}
  }
  function daysOnTier(){
    try{
      var since=+(localStorage.getItem('msc_since')||0);
      if(!since){since=Date.now(); localStorage.setItem('msc_since',String(since));}
      return Math.max(1, Math.floor((Date.now()-since)/86400000)+1);
    }catch(e){return 1;}
  }
  function priceOf(n){var t=tiers.filter(function(x){return x.n===n;})[0]; return t?t.p:0;}
  function paidDays(){
    try{
      var h=hist(), cut=Date.now()-7*864e5;
      var days={};
      h.forEach(function(x){
        if((x.ts||0)<cut) return;
        if(x.t&&x.t!=='Free'){
          var d=new Date(x.ts); var k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
          days[k]=1;
        }
      });
      // also count current paid tier day
      if(cur!=='Free') days[dayKey(0)]=1;
      return Object.keys(days).length;
    }catch(e){return 0;}
  }
  function render(){
    var trial=localStorage.getItem('msc_trial')===dayKey(0);
    var sc=0; try{sc=(JSON.parse(localStorage.getItem('msc_streak')||'{}').count)||0;}catch(e){}
    var th=hist();
    var visits=+(localStorage.getItem('ms_days')||0);
    var yr=priceOf(cur)*12;
    var pd=paidDays();
    var stick=daysOnTier();
    var nextTier=cur==='Free'?'Plus':(cur==='Plus'?'Elite':null);
    root.innerHTML='<div class="card">현재 티어: '+badgeHtml(cur)+' · 가상 · 정진 · Elite 창 '+eliteLeft()
      +'<div style="margin-top:6px"><span class="chip">🔥 '+sc+'일</span> <span class="chip">이 티어 '+stick+'일</span> <span class="chip">방문일 '+visits+'</span> <span class="chip">7일 유료일 '+pd+'</span>'
      +(trial?' <span class="chip" id="trialLeft">오늘 체험 <b>'+eliteLeft()+'</b> 남음</span>':'')
      +(cur!=='Free'?' <span class="chip">연 환산 ₩'+yr.toLocaleString()+'</span>':'')
      +(nextTier?' <span class="chip">다음 '+nextTier+'</span>':'')+'</div>'
      +(stick>=3&&cur!=='Free'?'<p class="sub" style="margin:6px 0 0;color:#67e8f9">유지 '+stick+'일 · 리텐션 루프 ON</p>':'')
      +'<p class="sub" id="retainLine" style="margin:6px 0 0;color:#e0b552">'+retainLine(cur)+'</p>'
      +'<p class="sub" style="margin:8px 0 0">실결제 아님 · 티어 체험 시뮬 · 18+'+(trial?' · 체험은 오늘 자정까지 · 숨김취소 없음':'')+'</p></div>'
      +'<div class="card" style="border-color:#e0b552"><b>이번 달 드롭</b> <span class="chip">'+monthLabel()+'</span>'
      +'<p class="sub" style="margin:6px 0 4px">가상 칸 · 결제/매출 숫자 없음 · 현재 '+cur+'</p>'
      +dropListHtml(cur)+'</div>'
      +'<div class="card" id="dropArch"><b>지난 드롭</b> <span class="chip">아카이브</span>'
      +'<p class="sub" style="margin:6px 0 4px">가상 · 매출/구독자 숫자 없음 · 결제 아님</p>'
      +(archOpen
        ? archMonthChips()+archTierChips()+archHideChips()+archiveHtml(cur)
          +'<p class="sub" id="archCsvN" style="margin:8px 0 0">열림 '+archiveOpenCount(cur)+'행 · 매출숫자 0</p>'
          +'<button class="sec" id="archCsv" style="width:100%;margin-top:8px">열림만 CSV · '+archiveCsvName()+'</button>'
          +'<button class="sec" id="archCsvCopy" style="width:100%;margin-top:8px">CSV 복사 · '+archiveCsvName()+'</button>'
          +'<button class="sec" id="archHide" style="width:100%;margin-top:8px">접기</button>'
        : '<button class="sec" id="archShow" style="width:100%">지난 2개월 보기</button>')
      +'</div>'
      +'<div class="card" id="dropNCard"><b>드롭 알림</b> <span class="chip" id="dropNChip">'+(dropNOn()?'가상 ON':'OFF')+'</span>'
      +(dropNOn()?' <span class="chip">다음 '+nextDropLine(cur)+'</span>':'')
      +'<p class="sub" style="margin:6px 0 8px">로컬 토글 · 푸시/서버 0 · 구독자·매출 숫자 없음 · 허위 MRR 0</p>'
      +'<button class="sec" id="dropN" style="width:100%">드롭 알림 '+(dropNOn()?'끄기':'켜기')+'</button></div>'
      +'<div class="card"><b>비교 (가상)</b><table style="width:100%;font-size:12px;margin-top:8px;border-collapse:collapse">'
      +'<tr style="color:#8a8398"><td></td>'+tiers.map(function(t){return '<td style="padding:4px;text-align:center">'+(t.n===cur?badgeHtml(t.n):'<span style="opacity:.8">'+((BADGE[t.n]||{}).e||'')+' '+t.n+'</span>')+'</td>';}).join('')+'</tr>'
      +'<tr><td>월</td>'+tiers.map(function(t){return '<td style="padding:4px;text-align:center">₩'+t.p.toLocaleString()+'</td>';}).join('')+'</tr>'
      +PERKS.map(function(pk){
        return '<tr><td>'+pk.l+'</td>'+tiers.map(function(t){
          return '<td style="padding:4px;text-align:center">'+(pk.has.indexOf(t.n)>=0?'✓':'–')+'</td>';
        }).join('')+'</tr>';
      }).join('')
      +'</table></div>'
      +tiers.map(function(t){
        var on=t.n===cur;
        return '<div class="card" style="'+(on?'border-color:#e0b552':'')+'">'+badgeHtml(t.n)+' · ₩'+t.p.toLocaleString()+(on?' · ✓ 선택중':'')
          +'<p class="sub" style="margin:6px 0 0">드롭 '+dropOf(t.n)+'</p>'
          +'<ul style="margin:8px 0 8px 18px;color:var(--dim);font-size:13px">'+t.f.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
          +'<button data-t="'+t.n+'">'+(on?'유지':'선택 (가상)')+'</button></div>';
      }).join('')
      +(cur!=='Free'?(cancelOpen
        ? '<div class="card" id="cancelCard" style="border-color:#f87171"><b>취소 확인</b>'
          +'<p class="sub" style="margin:6px 0 8px">잃는 혜택: '+(tiers.filter(function(x){return x.n===cur;})[0]||{f:[]}).f.join(' · ')+'</p>'
          +'<div class="row"><button id="keepTier">Keep '+cur+'</button><button id="downFree" class="sec">Down to Free</button></div>'
          +'<p class="sub" style="margin:8px 0 0">숨김취소 없음 · Keep/Down 둘 다 보임 · 허위 MRR 0</p></div>'
        : '<button id="cancel" class="sec" style="width:100%;margin-top:8px">Free로 다운그레이드</button>'):'')
      +(th.length?'<div class="card"><b>티어 변경 이력</b><div class="sub" style="margin-top:6px">'
        +th.slice(0,6).map(function(x){return (x.t||'?')+(x.trial?' (체험)':'')+' · '+new Date(x.ts||0).toLocaleString();}).join('<br>')
        +'</div><button class="sec" id="undoTier" style="margin-top:8px;width:100%">↩ 직전 티어 변경 취소</button></div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 후원 · 파이프 (엔터 18+)</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BMicroSub%5D%20support">☕ 후원 문의</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=msc&utm_medium=pipe">🎮 Arcade</a></div>';
    root.querySelectorAll('button[data-t]').forEach(function(b){
      b.onclick=function(){
        if(cur!==b.dataset.t) localStorage.setItem('msc_since',String(Date.now()));
        cur=b.dataset.t; localStorage.setItem('msc_tier',cur);
        try{var h=hist(); h.unshift({t:cur,ts:Date.now()}); localStorage.setItem('msc_hist',JSON.stringify(h.slice(0,20)));}catch(e){}
        bumpStreak(); render(); try{legionTrack('activate',{tier:cur})}catch(e){}
      };
    });
    var archShow=document.getElementById('archShow');
    if(archShow) archShow.onclick=function(){ archOpen=true; render(); try{legionTrack('archive_open',{})}catch(e){} };
    var archCsv=document.getElementById('archCsv');
    if(archCsv) archCsv.onclick=function(){
      exportArchiveCsv(cur);
      try{legionTrack('archive_csv_open',{n:archiveOpenCsv(cur).split('\n').length-1})}catch(e){}
    };
    /* WAVE94: 1-tap copy open-only CSV. Title/date/tier — no MRR, no revenue. */
    /* WAVE102: after copy keep #archCsvN row count. Status on button only. */
    /* WAVE112: copy confirm reverts to CSV 복사 · name. No fake MRR. */
    /* WAVE120: revert shows remaining seconds. No fake MRR. */
    /* WAVE127: tap during revert = instant original. No fake MRR. */
    /* WAVE133: month/tier chip during revert = instant orig. No fake MRR. */
    var revertArchCsvCopyNow=function(){
      var btn=document.getElementById('archCsvCopy');
      if(!btn || !btn._revT) return false;
      try{clearInterval(btn._revI);}catch(e){}
      try{clearTimeout(btn._revT);}catch(e2){}
      btn._revI=null;
      btn._revT=null;
      btn.textContent='CSV 복사 · '+archiveCsvName();
      return true;
    };
    var archCsvCopy=document.getElementById('archCsvCopy');
    if(archCsvCopy) archCsvCopy.onclick=function(){
      var csv=archiveOpenCsv(cur);
      var n=archiveOpenCount(cur);
      var nEl=document.getElementById('archCsvN');
      var orig='CSV 복사 · '+archiveCsvName();
      var REVERT_MS=1600;
      var keepN=function(){ if(nEl) nEl.textContent='열림 '+n+'행 · 매출숫자 0'; };
      var revert=function(){
        keepN();
        try{clearInterval(archCsvCopy._revI);}catch(e){}
        try{clearTimeout(archCsvCopy._revT);}catch(e2){}
        archCsvCopy._revI=null;
        archCsvCopy._revT=null;
        archCsvCopy.textContent=orig;
      };
      if(archCsvCopy._revT){ revert(); return; }
      var leftLabel=function(start){
        var left=Math.max(0, REVERT_MS-(Date.now()-start));
        return '되돌림 '+(left/1000).toFixed(1)+'s';
      };
      var armRevert=function(base){
        try{clearTimeout(archCsvCopy._revT);}catch(e){}
        try{clearInterval(archCsvCopy._revI);}catch(e){}
        var start=Date.now();
        archCsvCopy.textContent=base+' · '+leftLabel(start);
        archCsvCopy._revI=setInterval(function(){
          archCsvCopy.textContent=base+' · '+leftLabel(start);
        },100);
        archCsvCopy._revT=setTimeout(revert, REVERT_MS);
      };
      var done=function(){
        keepN();
        armRevert('복사됨 · '+n+'행 · '+archiveCsvName());
      };
      var fail=function(msg){
        keepN();
        armRevert(msg+' · '+n+'행 · '+archiveCsvName());
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(csv).then(done, function(){ fail('복사 실패 · 다운로드'); });
      }else{
        fail('클립보드 없음 · 다운로드');
      }
      try{legionTrack('archive_csv_copy_revert',{n:csv.split('\n').length-1})}catch(e){}
    };
    var archHide=document.getElementById('archHide');
    if(archHide) archHide.onclick=function(){ archOpen=false; render(); };
    root.querySelectorAll('#archM [data-am]').forEach(function(b){
      b.onclick=function(){
        revertArchCsvCopyNow();
        try{localStorage.setItem('msc_arch_m', b.dataset.am||'all');}catch(e){}
        render();
        try{legionTrack('archive_month',{m:archMonth()})}catch(e){}
      };
    });
    root.querySelectorAll('#archT [data-at]').forEach(function(b){
      b.onclick=function(){
        revertArchCsvCopyNow();
        try{localStorage.setItem('msc_arch_t', b.dataset.at||'all');}catch(e){}
        render();
        try{legionTrack('archive_tier',{t:archTier()})}catch(e){}
      };
    });
    root.querySelectorAll('#archH [data-ah]').forEach(function(b){
      b.onclick=function(){
        try{localStorage.setItem('msc_arch_hide', b.dataset.ah==='1'?'1':'0');}catch(e){}
        render();
        try{legionTrack('archive_hide_lock',{on:archHideLock()?1:0})}catch(e){}
      };
    });
    var dropN=document.getElementById('dropN');
    if(dropN) dropN.onclick=function(){
      try{localStorage.setItem('msc_drop_n', dropNOn()?'0':'1');}catch(e){}
      render();
      try{legionTrack('drop_notify',{on:dropNOn()?1:0})}catch(e){}
    };
    var cancel=document.getElementById('cancel');
    if(cancel) cancel.onclick=function(){
      cancelOpen=true; render();
      try{legionTrack('cancel_prompt',{tier:cur})}catch(e){}
    };
    var keep=document.getElementById('keepTier');
    if(keep) keep.onclick=function(){
      cancelOpen=false; render();
      try{legionTrack('keep_tier',{tier:cur})}catch(e){}
    };
    var down=document.getElementById('downFree');
    if(down) down.onclick=function(){
      cancelOpen=false;
      cur='Free'; localStorage.setItem('msc_tier',cur); localStorage.setItem('msc_since',String(Date.now()));
      try{var h=hist(); h.unshift({t:'Free',ts:Date.now(),down:1}); localStorage.setItem('msc_hist',JSON.stringify(h.slice(0,20)));}catch(e){}
      render(); try{legionTrack('activate',{down:1})}catch(e){}
    };
    var ut=document.getElementById('undoTier');
    if(ut) ut.onclick=function(){
      try{
        var h=hist(); if(h.length<2){ h.shift(); localStorage.setItem('msc_hist',JSON.stringify(h)); cur='Free'; }
        else { h.shift(); cur=h[0].t||'Free'; localStorage.setItem('msc_hist',JSON.stringify(h)); }
        localStorage.setItem('msc_tier',cur); localStorage.setItem('msc_since',String(Date.now()));
        render(); try{legionTrack('undo',{tier:cur})}catch(e){}
      }catch(e){}
    };
    if(!document.getElementById('trial')&&cur==='Free'){
      var tb=document.createElement('button'); tb.id='trial'; tb.style.cssText='width:100%;margin-top:8px'; tb.textContent='오늘 Plus 체험(가상)';
      tb.onclick=function(){
        if(localStorage.getItem('msc_trial')===dayKey(0)){return;}
        localStorage.setItem('msc_trial',dayKey(0)); cur='Plus'; localStorage.setItem('msc_tier',cur);
        localStorage.setItem('msc_since',String(Date.now()));
        try{var h=hist(); h.unshift({t:'Plus',ts:Date.now(),trial:1}); localStorage.setItem('msc_hist',JSON.stringify(h.slice(0,20)));}catch(e){}
        bumpStreak(); render(); try{legionTrack('activate',{trial:1})}catch(e){}
      };
      var pipe=document.getElementById('moneyPipe');
      if(pipe) root.insertBefore(tb, pipe); else root.appendChild(tb);
    }
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();
  setInterval(function(){ try{render();}catch(e){} }, 60000);
})();
