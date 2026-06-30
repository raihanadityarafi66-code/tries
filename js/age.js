// ══════════════════════════════════════════
//  AGE: auto-update on June 6th
// ══════════════════════════════════════════

function calcAge() {
  const birth = new Date(2010, 5, 6); // month is 0-indexed: 5 = June
  const now   = new Date();
  let age     = now.getFullYear() - birth.getFullYear();
  const notYet =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  if (notYet) age--;
  return age;
}

document.getElementById('age-text').textContent = calcAge() + ' y/o';

setInterval(() => {
  document.getElementById('age-text').textContent = calcAge() + ' y/o';
}, 3600 * 1000);

function calcAge() {
  const birth = new Date(2010, 5, 6); // month is 0-indexed: 5 = June
  const now   = new Date();
  let age     = now.getFullYear() - birth.getFullYear();
  const notYet =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  if (notYet) age--;
  return age;
}

document.getElementById('age-text').textContent = calcAge() + ' y/o';

setInterval(() => {
  document.getElementById('age-text').textContent = calcAge() + ' y/o';
}, 3600 * 1000);

// ══════════════════════════════════════════
// AGE: auto-update
// ══════════════════════════════════════════

function calcAge() {
    const birth = new Date(2010, 5, 6); // June 6, 2010
    const now = new Date();

    let age = now.getFullYear() - birth.getFullYear();

    const notYetBirthday =
        now.getMonth() < birth.getMonth() ||
        (now.getMonth() === birth.getMonth() &&
         now.getDate() < birth.getDate());

    if (notYetBirthday) age--;

    return age;
}

function updateAge() {
    const age = `${calcAge()} y/o`;

    const profileAge = document.getElementById('age-text');
    const sidebarAge = document.getElementById('sidebar-age');

    if (profileAge) profileAge.textContent = age;
    if (sidebarAge) sidebarAge.textContent = age;
}

// Initial update
updateAge();

// Refresh every hour
setInterval(updateAge, 3600 * 1000);