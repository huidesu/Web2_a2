// 当文档的DOM（文档对象模型）完全加载完成后，执行这个匿名函数
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('checkbox');
    // 获取id为“checkbox”的元素，这个元素将用于容纳类别（category）相关的单选框

    // 使用fetch API从指定的URL（'http://localhost:3060/api/funding/GATEGORY/ALL'）获取所有类别的数据
    // fetch返回一个Promise，用于处理异步操作
    fetch('http://localhost:3060/api/funding/GATEGORY/ALL')
    .then(response => response.json())
      // 将获取到的响应（response）转换为JSON格式的数据
      // 这个操作也是异步的，所以返回一个新的Promise
    .then(data => {
            // 遍历从服务器获取到的每个数据项（category）
            data.forEach(item => {
                // 如果数据项存在且包含'NAME'属性
                if (item && item['NAME']) {
                    const checkbox = document.createElement('input');
                    // 创建一个新的input元素，类型为'radio'（单选框）
                    checkbox.type = 'radio';
                    checkbox.value = item['NAME'];
                    // 设置单选框的值为类别名称
                    checkbox.id = 'checkbox_' + item['NAME'];
                    // 根据类别名称设置单选框的id
                    checkbox.name = 'only';
                    // 设置单选框的名称为'only'，确保同一组单选框的互斥性
                    const label = document.createElement('label');
                    // 创建一个新的label元素，用于关联单选框和显示类别名称
                    label.textContent = item['NAME'];
                    label.htmlFor = 'checkbox_' + item['NAME'];
                    // 设置label的for属性，使其与对应的单选框关联
                    container.appendChild(checkbox);
                    // 将单选框添加到“checkbox”容器元素中
                    container.appendChild(label);
                    // 将label添加到“checkbox”容器元素中
                    container.appendChild(document.createElement('br'));
                    // 在每个单选框和标签后面添加一个换行元素
                } else {
                    console.log('The data item is missing the name property or the name property is empty:', item);
                    // 如果数据项缺少'NAME'属性或者'NAME'属性为空，在控制台打印相关信息
                }
            });
        })
    .catch(error => console.error('Error:', error));
     // 如果在fetch过程中出现错误，捕获错误并在控制台打印错误信息
});

function startSearch() {
    const organizer = document.getElementById('organizer').value;
    // 获取id为“organizer”的输入框中的值，即组织者名称
    const city = document.getElementById('city').value;
    // 获取id为“city”的输入框中的值，即城市名称
    let category = document.querySelector('input[name = "only"]:checked')?.value;
    // 通过查询选择器获取被选中的（name为'only'）单选框的值，如果没有选中的则为undefined
    if (category === undefined) {
        category = '';
        // 如果没有选中的类别单选框，将类别设置为空字符串
    }
    let url = `http://localhost:3060/api/funding/SEARCH/one?organizer=${organizer}&city=${city}&category=${category}`;
    // 根据用户输入的组织者、城市和类别信息构建一个用于搜索的URL

    if (organizer || city || category) {
        // 如果组织者、城市或类别至少有一个有值（不为空字符串）
        fetch(url)
        .then(response => response.json())
          // 使用fetch API根据构建的URL获取搜索结果，并将响应转换为JSON格式的数据
        .then(data => {
                const MyDiv = document.getElementById('records');
                MyDiv.innerHTML = "";
                // 先清空id为“records”的元素中的内容，用于显示新的搜索结果
                console.log(data);
                if (data.length > 0) {
                    const MyDiv = document.getElementById('records');
                    MyDiv.innerHTML = '';
                    // 再次清空“records”元素内容（可能是为了确保之前的残留内容被完全清除）
                    data.forEach(fundraiser => {
                        const item = document.createElement('li');
                        // 对于每个搜索到的筹款者（fundraiser），创建一个新的<li>元素
                        const idP = document.createElement('p');
                        idP.textContent = `ID: ${fundraiser.FUNDRAISER_ID}`;
                        // 创建一个<p>元素，显示筹款者的ID
                        const organizerP = document.createElement('p');
                        organizerP.textContent = `Organizer: ${fundraiser.ORGANIZER}`;
                        // 创建一个<p>元素，显示筹款者的组织者
                        const captionP = document.createElement('p');
                        captionP.textContent = `Caption: ${fundraiser.CAPTION}`;
                        // 创建一个<p>元素，显示筹款者的标题
                        const targetFundingP = document.createElement('p');
                        targetFundingP.textContent = `Target Funding: ${fundraiser.TARGET_FUNDING} AUD`;
                        // 创建一个<p>元素，显示筹款者的目标筹款金额
                        const currentFundingP = document.createElement('p');
                        currentFundingP.textContent = `Current Funding: ${fundraiser.CURRENT_FUNDING} AUD`;
                        // 创建一个<p>元素，显示筹款者的当前筹款金额
                        const cityP = document.createElement('p');
                        cityP.textContent = `City: ${fundraiser.CITY}`;
                        // 创建一个<p>元素，显示筹款者所在的城市
                        const categoryP = document.createElement('p');
                        categoryP.textContent = `Category: ${fundraiser.CategoryName}`;
                        // 创建一个<p>元素，显示筹款者的类别
                        const statusP = document.createElement('p');
                        statusP.textContent = `Status: ${fundraiser.ACTIVE? 'Active' : 'Inactive'};`
                        // 创建一个<p>元素，显示筹款者的状态（根据ACTIVE属性判断是活跃还是不活跃）

                        item.appendChild(idP);
                        item.appendChild(organizerP);
                        item.appendChild(captionP);
                        item.appendChild(targetFundingP);
                        item.appendChild(currentFundingP);
                        item.appendChild(cityP);
                        item.appendChild(categoryP);
                        item.appendChild(statusP);
                        // 将各个包含筹款者信息的<p>元素添加到对应的<li>元素中

                        item.addEventListener("click", function () {
                            localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                            location.href = '/fundraiser';
                        });
                        // 为每个筹款者信息块（<li>元素）添加一个点击事件监听器
                        // 当点击时，将筹款者的ID存储到本地存储（localStorage）中，并将页面重定向到'/fundraiser'路径

                        MyDiv.appendChild(item);
                        // 将包含完整筹款者信息的<li>元素添加到“records”元素中，用于显示搜索结果
                    });
                } else {
                    const errorP = document.createElement('p');
                    errorP.textContent = 'No relevant fundraisers found';
                    errorP.style.color ='red';
                    errorP.style.fontWeight = 'bold';
                    MyDiv.appendChild(errorP);
                    // 如果没有搜索到相关的筹款者，创建一个<p>元素显示相应的提示信息，设置颜色为红色并且加粗字体，然后添加到“records”元素中
                }
            })
        .catch(error => {
                console.error("Error here", error);
                if (error.status === 404) {
                    document.getElementById('records').textContent = "No relevant data found, please check the search conditions";
                    // 如果搜索结果返回404状态码（未找到相关数据），在“records”元素中显示相应的提示信息，提示用户检查搜索条件
                } else if (error.status === 500) {
                    document.getElementById('records').textContent = "Internal server error, please try again later";
                    // 如果搜索结果返回500状态码（服务器内部错误），在“records”元素中显示相应的提示信息，提示用户稍后再试
                } else {
                    document.getElementById('records').textContent = "Load failed";
                    // 如果是其他错误，在“records”元素中显示“Load failed”（加载失败）的提示信息
                }
            });
    } else {
        alert('At least one search condition needs to be provided!');
        const MyDiv = document.getElementById('records');
        MyDiv.textContent = "";
        // 如果组织者、城市和类别都没有输入任何值，弹出一个警告框提示用户至少需要提供一个搜索条件，并且清空“records”元素中的内容
    }
}

function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name = "only"]');
    // 获取所有name为'only'的单选框元素
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        // 将每个单选框的选中状态设置为false（未选中）
    });
    document.getElementById('organizer').value = '';
    // 清空组织者输入框中的值
    document.getElementById('city').value = '';
    // 清空城市输入框中的值
}
/**在DOMContentLoaded事件处理函数中，从服务器获取所有的类别数据，并在页面加载时动态生成类别单选框及其对应的标签，显示在 HTML 页面中。
startSearch函数在用户点击 “Search” 按钮时被触发。它收集用户在组织者、城市输入框和类别单选框中的输入值，构建搜索请求的 URL，
然后根据搜索结果进行不同的操作。如果有搜索结果，则将每个筹款者的详细信息以列表项的形式展示在搜索结果区域；如果没有搜索结果或者出现错误，则在搜索结果区域显示相应的提示信息。
clearCheckboxes函数在用户点击 “Clear” 按钮时被触发，用于清除类别单选框的选中状态，并清空组织者和城市输入框中的内容。 */