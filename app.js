
(function(){
  var tiers=[{n:'Free',p:0,f:['기본 피드']},{n:'Plus',p:4900,f:['광고 제거','주간 드롭']},{n:'Elite',p:14900,f:['전체 드롭','DM 우선']}];
  var root=document.getElementById('app');
  var cur=localStorage.getItem('msc_tier')||'Free';
  function render(){
    root.innerHTML='<div class="card">현재 티어: <b style="color:var(--gold)">'+cur+'</b> · 가상 시뮬</div>'+tiers.map(function(t){
      return '<div class="card"><b>'+t.n+'</b> · ₩'+t.p.toLocaleString()+'<ul style="margin:8px 0 8px 18px;color:var(--dim);font-size:13px">'+t.f.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul><button data-t="'+t.n+'">선택 (가상)</button></div>';
    }).join('');
    root.querySelectorAll('button[data-t]').forEach(function(b){b.onclick=function(){cur=b.dataset.t;localStorage.setItem('msc_tier',cur);render();try{legionTrack('activate',{tier:cur})}catch(e){};};});
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
