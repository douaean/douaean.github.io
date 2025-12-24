const sessionsEl = document.getElementById('sessions');
const summaryEl = document.getElementById('summary');
const topicEl = document.getElementById('topic');
const durationEl = document.getElementById('duration');
const addBtn = document.getElementById('add');

let sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

function render() {
  sessionsEl.innerHTML = '';
  let total = 0;
  sessions.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `${s.topic} — ${s.duration} min`;
    const done = document.createElement('button');
    done.textContent = 'Done';
    done.onclick = () => { sessions.splice(i,1); save(); render(); };
    li.appendChild(done);
    sessionsEl.appendChild(li);
    total += Number(s.duration);
  });
  summaryEl.textContent = `Total planned time: ${total} min`;
}

function save(){ localStorage.setItem('sessions', JSON.stringify(sessions)); }

addBtn.onclick = () => {
  const topic = topicEl.value.trim();
  const duration = Number(durationEl.value) || 25;
  if(!topic) return alert('Please enter a topic');
  sessions.push({topic,duration});
  topicEl.value=''; durationEl.value='';
  save(); render();
};

render();