(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const menuButton = $('.menu-toggle');
  const nav = $('#main-nav');
  function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Apri menu'); nav.classList.remove('open'); }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Apri menu' : 'Chiudi menu');
    nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('current', a.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#progetti, #chi-sono, #feedback, #social').forEach(s => observer.observe(s));
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    let count = 0;
    document.querySelectorAll('.project-item').forEach(project => {
      const visible = button.dataset.filter === 'all' || project.dataset.status === button.dataset.filter;
      project.hidden = !visible;
      if (visible) count++;
    });
    $('.project-count').textContent = count + (count === 1 ? ' progetto da esplorare' : ' progetti da esplorare');
  }));
  const projects = {
    farkle: { name: 'Farkle Villains', label: 'DISPONIBILE ORA / ANDROID', description: 'Il classico Farkle incontra villain con poteri speciali. Scegli quando fermarti e quando rischiare: il prossimo lancio potrebbe cambiare tutto.', points: ['Villain con poteri speciali per dare un twist a ogni partita.', 'Multiplayer locale per giocare insieme.', 'Avatar e dadi personalizzabili.', 'Classifica cloud per tenere traccia della sfida.'], note: 'Gratis da giocare, con pubblicità e pacchetti opzionali a pagamento.', image: true },
    kickroll: { name: 'Kick & Roll', label: 'IN SVILUPPO / BROWSER E MOBILE', description: 'Il calcio da tavolo in versione digitale: dita, tattica e goal. Un progetto ispirato al classico subbuteo, reinterpretato per browser e mobile.', points: ['Lo spirito del calcio da tavolo, in un’esperienza digitale.', 'Tattica e tocchi al centro dell’idea di gioco.', 'Pensato per browser e dispositivi mobili.'], note: 'Il progetto è in sviluppo. Non è ancora disponibile e non è stata annunciata una data di uscita.' },
    dnd: { name: 'D&D Companion', label: 'IN ARRIVO / IL PROSSIMO CAPITOLO', description: 'Un companion digitale per accompagnare le sessioni di D&D e lasciare più spazio all’avventura. Il prossimo capitolo del laboratorio Geppo Dev.', points: ['Dadi digitali per i tuoi tiri.', 'Un tavolo virtuale per le sessioni.', 'Schede personaggio a portata di mano.'], note: 'Queste sono le funzionalità previste per il progetto. Il companion non è ancora disponibile e non è stata annunciata una data di uscita.' }
  };
  const dialog = $('#project-dialog');
  let dialogOpener;
  function closeDialog() { dialog.close(); document.body.classList.remove('body-modal'); }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.project;
    const p = projects[id];
    if (!p) return;
    dialogOpener = button;
    $('#dialog-content').innerHTML = `<div class="dialog-content-inner"><p class="eyebrow">${p.label}</p><h2 id="dialog-title">${p.name}<span class="gold-dot">.</span></h2>${p.image ? '<img class="dialog-image" src="assets/farkle-original.png" width="1920" height="1080" alt="Farkle Villains e i suoi tre villain">' : ''}<p>${p.description}</p><ul>${p.points.map(point => `<li>${point}</li>`).join('')}</ul><p class="dialog-footnote">${p.note}</p><div class="dialog-actions">${id === 'farkle' ? '<a class="button primary" href="https://play.google.com/store/apps/details?id=com.geppo.farklevillains&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">Gioca su Google Play ↗</a>' : ''}<a class="text-link dialog-feedback" href="#feedback">${id === 'farkle' ? 'Lascia un feedback' : 'Hai un’idea per il progetto?'} <span>↗</span></a></div></div>`;
    $('.dialog-feedback').addEventListener('click', () => { selectGame(id); closeDialog(); });
    dialog.showModal();
    document.body.classList.add('body-modal');
  }));
  $('.dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('body-modal'); if (dialogOpener) dialogOpener.focus({ preventScroll: true }); });
  const form = $('#feedback-form');
  const game = $('#game');
  const email = $('#email');
  const subject = $('#subject');
  const message = $('#message');
  const status = $('#feedback-status');
  const sendButton = $('.send-button');
  const fallback = $('#email-fallback');
  const names = { farkle: 'Farkle Villains', kickroll: 'Kick & Roll', dnd: 'D&D Companion', general: 'Geppo Dev' };
  let subjectEdited = false;
  let submitting = false;
  function currentKind() { return form.querySelector('input[name="kind"]:checked').value; }
  function autoSubject() { return currentKind() + ' per ' + names[game.value]; }
  function updateFallback() { fallback.href = 'mailto:privacygamegeppo@gmail.com?subject=' + encodeURIComponent(subject.value || autoSubject()) + '&body=' + encodeURIComponent('Progetto: ' + names[game.value] + '\nTipo: ' + currentKind() + '\n\n' + message.value); }
  function refreshSubject() { if (!subjectEdited) subject.value = autoSubject(); updateFallback(); }
  function selectGame(id) { if (names[id]) { game.value = id; subjectEdited = false; refreshSubject(); } }
  function showStatus(text, error = false) { status.textContent = text; status.classList.toggle('error', error); status.hidden = false; }
  game.addEventListener('change', refreshSubject);
  form.querySelectorAll('[name="kind"]').forEach(input => input.addEventListener('change', refreshSubject));
  subject.addEventListener('input', () => { subjectEdited = subject.value.trim() !== ''; subject.removeAttribute('aria-invalid'); updateFallback(); });
  email.addEventListener('input', () => email.removeAttribute('aria-invalid'));
  message.addEventListener('input', () => { $('#message-count').textContent = message.value.length + ' / 3000'; message.removeAttribute('aria-invalid'); updateFallback(); });
  const preselected = new URLSearchParams(location.search).get('game');
  if (preselected && names[preselected]) selectGame(preselected); else refreshSubject();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || form.elements.website.value) return;
    [message, email, subject].forEach(field => field.removeAttribute('aria-invalid'));
    if (message.value.trim().length < 5) { message.setAttribute('aria-invalid', 'true'); showStatus('Raccontami qualcosa in più: scrivi almeno 5 caratteri.', true); message.focus(); return; }
    if (email.value && !email.checkValidity()) { email.setAttribute('aria-invalid', 'true'); showStatus('Controlla l’indirizzo email: sembra che manchi qualcosa.', true); email.focus(); return; }
    if (!subject.value.trim()) { subject.value = autoSubject(); subjectEdited = false; }
    submitting = true; sendButton.disabled = true; sendButton.querySelector('span').textContent = 'Invio in corso…'; status.hidden = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const data = { _subject: subject.value.trim(), _template: 'table', _captcha: 'false', Gioco: names[game.value], Tipo: currentKind(), Oggetto: subject.value.trim(), Email: email.value.trim() || '(non indicata)', Descrizione: message.value.trim() };
    if (email.value.trim()) data._replyto = email.value.trim();
    try {
      const response = await fetch('https://formsubmit.co/ajax/privacygamegeppo@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data), signal: controller.signal });
      const result = await response.json();
      if (!response.ok || String(result.success) !== 'true') throw new Error('feedback_failed');
      showStatus('Feedback inviato. Grazie per aver fatto la tua mossa!');
      message.value = ''; $('#message-count').textContent = '0 / 3000'; updateFallback();
    } catch {
      showStatus('L’invio non è riuscito. Il messaggio è ancora qui: usa “Apri un messaggio email” qui sotto per inviarlo dal tuo programma di posta.', true);
    } finally { clearTimeout(timeout); submitting = false; sendButton.disabled = false; sendButton.querySelector('span').textContent = 'Invia il tuo feedback'; }
  });
  $('#year').textContent = String(new Date().getFullYear());
})();
