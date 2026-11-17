(() => {
'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('main-nav');
function closeMenu(){if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open')}
if(menu&&nav){
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
 window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
}
const projectButtons=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('.project-entry[data-status]')];
projectButtons.forEach(button=>{
 const count=cards.filter(c=>button.dataset.filter==='all'||c.dataset.status===button.dataset.filter).length;
 button.querySelector('span').textContent=count;
 button.addEventListener('click',()=>{
  const filter=button.dataset.filter;let visible=0;
  const url = new URL(location.href);
  if (url.searchParams.has('status') && url.searchParams.get('status') !== filter) {
    if (filter === 'all') url.searchParams.delete('status');
    else url.searchParams.set('status', filter);
    history.replaceState(null, '', url.href);
  }
  cards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.status!==filter;if(!card.hidden)visible++});
  projectButtons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
  document.getElementById('project-status').textContent=visible+' '+(filter==='all'?'projects · current and completed':filter==='current'?'current research projects':'completed projects');
 });
});
const requestedStatus = new URLSearchParams(location.search).get('status');
const requestedFilter = projectButtons.find(button => button.dataset.filter === requestedStatus);
if (requestedFilter) requestedFilter.click();
const newsButtons=[...document.querySelectorAll('[data-news-year]')],news=[...document.querySelectorAll('[data-news]')];
newsButtons.forEach(button=>button.addEventListener('click',()=>{
 let visible=0;const year=button.dataset.newsYear;
 news.forEach(item=>{item.hidden=year!=='all'&&item.dataset.news!==year;if(!item.hidden)visible++});
 newsButtons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
 document.getElementById('news-status').textContent=visible+(visible===1?' update':' updates')+(year==='all'?'':' · '+year);
}));

const gallery = document.querySelector('.photo-gallery');
if (gallery) {
  const track = gallery.querySelector('.gallery-track');
  const slides = Array.from(track.querySelectorAll('figure'));
  const controls = gallery.querySelector('.gallery-controls');
  const counter = gallery.querySelector('.gallery-count');
  let requestedIndex = null;

  function visibleIndex() {
    return Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)));
  }

  function stepPhoto(step) {
    const start = requestedIndex === null ? visibleIndex() : requestedIndex;
    requestedIndex = (start + step + slides.length) % slides.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: requestedIndex * track.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  function updateCount() {
    const text = (visibleIndex() + 1) + ' / ' + slides.length;
    if (counter.textContent !== text) counter.textContent = text;
  }

  if (slides.length > 1) {
    controls.hidden = false;
    counter.hidden = false;
    gallery.classList.add('has-controls');
    updateCount();
    controls.querySelectorAll('[data-photo-step]').forEach(button => {
      button.addEventListener('click', () => stepPhoto(Number(button.dataset.photoStep)));
    });
    track.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        stepPhoto(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    for (const event of ['pointerdown', 'wheel']) {
      track.addEventListener(event, () => { requestedIndex = null; }, { passive: true });
    }
    track.addEventListener('scroll', updateCount, { passive: true });
    track.addEventListener('scrollend', () => {
      if (requestedIndex === visibleIndex()) requestedIndex = null;
    });
  }
}

// Preserve previously shared single-page bookmarks.
if(document.body.classList.contains('page-home')){
 const routes={'about-us':'about.html','contact-us':'contact.html',about:'about.html',research:'research.html',projects:'projects.html',people:'people.html',news:'news.html',contact:'contact.html'};
 const bookmark = location.hash.slice(1);
 const projectFilters = {'current-research': 'current', 'completed-projects': 'completed'};
 if (Object.hasOwn(projectFilters, bookmark)) {
   const target = new URL('projects.html', location.href);
   target.search = location.search;
   target.searchParams.set('status', projectFilters[bookmark]);
   target.hash = 'research-projects';
   location.replace(target.href);
 } else if (Object.hasOwn(routes, bookmark)) {
   location.replace(routes[bookmark] + location.search);
 }
}
})();