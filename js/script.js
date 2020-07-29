let allPeople = [];
let allPeopleFilter = [];
let statisticPeople = [];

let countMen = 0;
let countWoman = 0;
let countAges = 0;
let countaverage = 0;

const searchStatistic = document.querySelector('#searchStatistic');
const buttonSearch = document.querySelector('#buttonSearch');
const searchline = document.querySelector('#searchline');
buttonSearch.addEventListener('click', configFilter);

window.addEventListener('load', () => {
  //1
  let listPeople = document.querySelector('#listPeople');
  buttonSearch.disabled = true;

  countPeople = document.querySelector('#countPeople');
  countMen = document.querySelector('#countMen');
  countWoman = document.querySelector('#countWoman');
  countAge = document.querySelector('#countAge');
  countaverage = document.querySelector('#countaverage');

  getPeople();
});

searchline.addEventListener('keyup', function events(e) {
  //3
  checkSearch();
  if (
    searchline.value.length > 0 &&
    e.keyCode === 13 &&
    searchline.value.trim(' ')
  ) {
    configFilter();
  }
});

function getPeople() {
  //2
  allPeople = people.results.map((person) => {
    return {
      name: person.name.first + ' ' + person.name.last,
      age: person.dob.age,
      gender: person.gender,
      picture: person.picture.large,
    };
  });
  allPeopleFilter = allPeople;
}

function render() {
  //6
  renderPeopleList();
  renderStatistic(allPeopleFilter);
}

function renderPeopleList() {
  //7
  let listPeopleHTML = '<div>';

  countPeople.textContent =
    allPeopleFilter.length + ' Usuário(s) Encontrados(s)';
  searchStatistic.textContent = 'Estatística';

  allPeopleFilter.forEach((person) => {
    const { name, age, gender, picture } = person;

    const personHTML = `
    
      <tbody>
        <tr>
          <td><img src="${picture}" alt="${name}" /></td>
          <td><p>${name}</p></td>
          <td><p>${age} anos</p></td>
        </tr>
      </tbody>

    `;

    listPeopleHTML += personHTML;
  });

  listPeopleHTML += '</div>';
  listPeople.innerHTML = listPeopleHTML;
}

function renderStatistic(allPeopleFilter) {
  //8
  let statistic = document.querySelector('#tabstatistic');

  const allMen = allPeopleFilter.reduce(
    (acc, cur) => (cur.gender === 'male' ? ++acc : acc),
    0
  );

  const allWoman = allPeopleFilter.reduce(
    (acc, cur) => (cur.gender === 'female' ? ++acc : acc),
    0
  );

  const allAges = allPeopleFilter.reduce((acc, cur) => (acc += cur.age), 0);

  const averege = allAges / allPeopleFilter.length;

  statistic.innerHTML = '';

  const table = document.createElement('table');
  table.setAttribute('class', 'table table-hover');
  statistic.appendChild(table);
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const tr = document.createElement('tr');
  thead.appendChild(tr);

  const th1 = document.createElement('th');
  th1.setAttribute('class', 'th1');
  tr.appendChild(th1);
  const th2 = document.createElement('th');
  th2.setAttribute('class', 'th2');
  tr.appendChild(th2);
  const th3 = document.createElement('th');
  th3.setAttribute('class', 'th3');
  tr.appendChild(th3);

  const th4 = document.createElement('th');
  th4.setAttribute('class', 'th4');
  tr.appendChild(th4);

  const tbody = document.createElement('tbody');
  tbody.setAttribute('class', 'tbody');
  table.appendChild(tbody);
  const trTbody = document.createElement('tr');
  tbody.appendChild(trTbody);

  const td1 = document.createElement('td');
  td1.setAttribute('class', 'td1');
  trTbody.appendChild(td1);

  const td2 = document.createElement('td');
  td2.setAttribute('class', 'td2');
  trTbody.appendChild(td2);

  const td3 = document.createElement('td');
  td3.setAttribute('class', 'td1');
  trTbody.appendChild(td3);

  const td4 = document.createElement('td');
  td4.setAttribute('class', 'td4');
  trTbody.appendChild(td4);

  th1.textContent = `Usuários masculinos`;
  td1.textContent = `${allMen} `;

  th2.textContent = `Usuários femininos`;
  td2.textContent = `${allWoman} `;

  th3.textContent = `Soma das idades`;
  td3.textContent = `${allAges} `;

  th4.textContent = `Média das idades`;
  td4.textContent = `${averege.toFixed(2)} `;
}

function configFilter() {
  //4
  const filterValue = searchline.value.toLowerCase();
  allPeopleFilter = allPeople.filter((item) => {
    return item.name.toLowerCase().includes(filterValue); // verificar
  });
  spinnerRun();
}

function checkSearch() {
  //5
  if (searchline.value.length > 0 && searchline.value.trim(' ')) {
    //verificar trim
    buttonSearch.disabled = false;
  }
}

function spinnerRun() {
  const interval = setInterval(() => {
    const spinner = document.querySelector('#spinner');
    spinner.style.visibility = '';
  }, 500);
  setTimeout(() => {
    spinner.style.visibility = 'hidden';
    this.clearInterval(interval);
    render();
  }, 3000);
}
