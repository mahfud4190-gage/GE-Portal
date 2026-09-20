/* Edition 1 overlay manager.
 * All page dialogs are promoted to document.body so they own the full viewport,
 * including the fixed portal header and sidebar. No page-local stacking context
 * can trap a modal underneath the shell.
 */
(function(){
'use strict';
const selectors=[
  '.initiative-dialog', '.modal-backdrop', '.tp-modal-backdrop',
  '.map-move-modal-backdrop', '#r8InitiativeBackdrop', '#r9InitiativeBackdrop',
  '.r9-portal-dialog', '.ge-viewport-overlay', '#geV251EventModal',
  '#geV2542DraftModal', '#geCalListModalV2533', '#geV2532ListModal',
  '.p26-account-modal', '.p26-reset-modal', '.p26-import-modal'
];
const matches=()=>document.querySelectorAll(selectors.join(','));
function promote(){matches().forEach(el=>{if(el.parentElement!==document.body)document.body.appendChild(el)});}
function closeOverlay(overlay){
  if(!overlay)return;
  const close=overlay.querySelector('[data-close],.modal-x,.modal-close,[aria-label="Tutup"],[aria-label="Close"],#p26Close,#p26Cancel,#p26ImportClose,#p26ImportCancel');
  if(close){close.click();return;}
  overlay.classList.remove('show');
  document.body.classList.remove('modal-open');
}
function install(){
  promote();
  new MutationObserver(promote).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',e=>{
    const overlay=e.target.closest(selectors.join(','));
    if(overlay && e.target===overlay) closeOverlay(overlay);
  });
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    const open=[...matches()].reverse().find(x=>x.classList.contains('show')||getComputedStyle(x).display!=='none');
    if(open)closeOverlay(open);
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
