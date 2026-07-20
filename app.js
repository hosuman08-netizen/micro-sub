
/* LEGION_WAVE_26_today_counter */
try{var _dk=new Date().toDateString();var _o=JSON.parse(localStorage.getItem('lw_p32_micro_su_today_counter')||'{}');if(_o.d!==_dk)_o={d:_dk,n:0};_o.n=(_o.n||0)+1;localStorage.setItem('lw_p32_micro_su_today_counter',JSON.stringify(_o));}catch(e){}

try{if(!sessionStorage.getItem('ms_v')){sessionStorage.setItem('ms_v','1'); localStorage.setItem('ms_days', (+(localStorage.getItem('ms_days')||0))+ (localStorage.getItem('ms_last')===new Date().toDateString()?0:1)); localStorage.setItem('ms_last', new Date().toDateString());}}catch(e){}
(function(){
  var tiers=[{n:'Free',p:0,f:['기본 피드','광고 포함']},{n:'Plus',p:4900,f:['광고 제거','주간 드롭','북마크']},{n:'Elite',p:14900,f:['전체 드롭','DM 우선','얼리 액세스']}];
  var root=document.getElementById('app');
  var cur=localStorage.getItem('msc_tier')||'Free';
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
  function render(){
    var trial=localStorage.getItem('msc_trial')===dayKey(0);
    var sc=0; try{sc=(JSON.parse(localStorage.getItem('msc_streak')||'{}').count)||0;}catch(e){}
    var th=hist();
    var visits=+(localStorage.getItem('ms_days')||0);
    var yr=priceOf(cur)*12;
    root.innerHTML='<div class="card">현재 티어: <b style="color:var(--gold)">'+cur+'</b> · 가상 · 정진 · Elite 창 '+eliteLeft()
      +'<div style="margin-top:6px"><span class="chip">🔥 '+sc+'일</span> <span class="chip">이 티어 '+daysOnTier()+'일</span> <span class="chip">방문일 '+visits+'</span>'
      +(trial?' <span class="chip">오늘 체험 ON</span>':'')
      +(cur!=='Free'?' <span class="chip">연 환산 ₩'+yr.toLocaleString()+'</span>':'')+'</div>'
      +'<p class="sub" style="margin:8px 0 0">실결제 아님 · 티어 체험 시뮬 · 18+</p></div>'
      +'<div class="card"><b>비교 (가상)</b><table style="width:100%;font-size:12px;margin-top:8px;border-collapse:collapse">'
      +'<tr style="color:#8a8398"><td></td>'+tiers.map(function(t){return '<td style="padding:4px;text-align:center">'+(t.n===cur?'<b style="color:#e0b552">'+t.n+'</b>':t.n)+'</td>';}).join('')+'</tr>'
      +'<tr><td>월</td>'+tiers.map(function(t){return '<td style="padding:4px;text-align:center">₩'+t.p.toLocaleString()+'</td>';}).join('')+'</tr>'
      +'<tr><td>혜택</td>'+tiers.map(function(t){return '<td style="padding:4px;text-align:center">'+t.f.length+'</td>';}).join('')+'</tr>'
      +'</table></div>'
      +tiers.map(function(t){
        var on=t.n===cur;
        return '<div class="card" style="'+(on?'border-color:#e0b552':'')+'"><b>'+t.n+'</b> · ₩'+t.p.toLocaleString()+(on?' · ✓ 선택중':'')
          +'<ul style="margin:8px 0 8px 18px;color:var(--dim);font-size:13px">'+t.f.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
          +'<button data-t="'+t.n+'">'+(on?'유지':'선택 (가상)')+'</button></div>';
      }).join('')
      +(cur!=='Free'?'<button id="cancel" class="sec" style="width:100%;margin-top:8px">Free로 다운그레이드</button>':'')
      +(th.length?'<div class="card"><b>티어 변경 이력</b><div class="sub" style="margin-top:6px">'
        +th.slice(0,6).map(function(x){return (x.t||'?')+(x.trial?' (체험)':'')+' · '+new Date(x.ts||0).toLocaleString();}).join('<br>')
        +'</div></div>':'')
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
    var cancel=document.getElementById('cancel');
    if(cancel) cancel.onclick=function(){
      cur='Free'; localStorage.setItem('msc_tier',cur); localStorage.setItem('msc_since',String(Date.now()));
      try{var h=hist(); h.unshift({t:'Free',ts:Date.now(),down:1}); localStorage.setItem('msc_hist',JSON.stringify(h.slice(0,20)));}catch(e){}
      render(); try{legionTrack('activate',{down:1})}catch(e){}
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
