document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('checkbox');
    fetch('http://localhost:3060/api/funding/GATEGORY/ALL')
      .then(response => response.json())
      .then(data => {
            data.forEach(item => {
                if (item && item['NAME']) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'radio';
                    checkbox.value = item['NAME'];
                    checkbox.id = 'checkbox_' + item['NAME'];
                    checkbox.name = 'only';
                    const label = document.createElement('label');
                    label.textContent = item['NAME'];
                    label.htmlFor = 'checkbox_' + item['NAME'];
                    container.appendChild(checkbox);
                    container.appendChild(label);
                    container.appendChild(document.createElement('br'));
                } else {
                    console.log('数据项缺少名称属性或名称属性为空:', item);
                }
            });
        })
      .catch(error => console.error('Error:', error));
});

function startSearch() {
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    let category = document.querySelector('input[name = "only"]:checked')?.value;
    if (category === undefined) {
        category = '';
    }
    let url = `http://localhost:3060/api/funding/SEARCH/one?organizer=${organizer}&city=${city}&category=${category}`;
    if (organizer || city || category) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
                const MyDiv = document.getElementById('records');
                MyDiv.innerHTML = "";
                console.log(data);
                // if (data.length > 0) {
                //     data.forEach(fundraiser => {
                //         const newP = document.createElement("p");
                //         newP.textContent = `Findraiser ID:${fundraiser.FUNDRAISER_ID},ORGANIZER:${fundraiser.ORGANIZER}, CAPTION: ${fundraiser.CAPTION},TARGET_FUNDING: ${fundraiser.TARGET_FUNDING}, CURRENT_FUNDING: ${fundraiser.CURRENT_FUNDING},CITY:${fundraiser.CITY}`;
                //         newP.addEventListener("click", function () {
                //             localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                //             location.href = '/fundraiser';
                //         });
                //         MyDiv.appendChild(newP);
                //     });
                // } else {
                //     const errorP = document.createElement('p');
                //     errorP.textContent = '未找到相关筹款人';
                //     errorP.style.color ='red';
                //     errorP.style.fontWeight = 'bold';
                //     MyDiv.appendChild(errorP);
                // }
                if (data.length > 0) {
                    const MyDiv = document.getElementById('records');
                    MyDiv.innerHTML = '';
                    data.forEach(fundraiser => {
                        const item = document.createElement('li');
                        const idP = document.createElement('p');
                        idP.textContent = `ID: ${fundraiser.FUNDRAISER_ID}`;
                        const organizerP = document.createElement('p');
                        organizerP.textContent = `组织者: ${fundraiser.ORGANIZER}`;
                        const captionP = document.createElement('p');
                        captionP.textContent = `标题: ${fundraiser.CAPTION}`;
                        const targetFundingP = document.createElement('p');
                        targetFundingP.textContent = `目标资金: ${fundraiser.TARGET_FUNDING} AUD`;
                        const currentFundingP = document.createElement('p');
                        currentFundingP.textContent = `当前资金: ${fundraiser.CURRENT_FUNDING} AUD`;
                        const cityP = document.createElement('p');
                        cityP.textContent = `城市: ${fundraiser.CITY}`;
                        const categoryP = document.createElement('p');
                        categoryP.textContent = `类别: ${fundraiser.CategoryName}`;
                        const statusP = document.createElement('p');
                        statusP.textContent = `状态: ${fundraiser.ACTIVE? '活跃' : '未活跃'}`;
                
                        item.appendChild(idP);
                        item.appendChild(organizerP);
                        item.appendChild(captionP);
                        item.appendChild(targetFundingP);
                        item.appendChild(currentFundingP);
                        item.appendChild(cityP);
                        item.appendChild(categoryP);
                        item.appendChild(statusP);
                
                        item.addEventListener("click", function () {
                            localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                            location.href = '/fundraiser';
                        });
                        MyDiv.appendChild(item);
                    });
                } else {
                    const errorP = document.createElement('p');
                    errorP.textContent = '未找到相关筹款人';
                    errorP.style.color ='red';
                    errorP.style.fontWeight = 'bold';
                    MyDiv.appendChild(errorP);
                }
            })
          .catch(error => {
                console.error("Error here", error);
                if (error.status === 404) {
                    document.getElementById('records').textContent = "未找到相关数据，请检查搜索条件";
                } else if (error.status === 500) {
                    document.getElementById('records').textContent = "服务器内部错误，请稍后再试";
                } else {
                    document.getElementById('records').textContent = "加载失败";
                }
            });
    } else {
        alert('至少需要提供一个搜索条件!');
        const MyDiv = document.getElementById('records');
        MyDiv.textContent = "";
    }
}

function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name = "only"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('organizer').value = '';
    document.getElementById('city').value = '';
    
}

