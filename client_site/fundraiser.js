// 当文档的DOM（文档对象模型）完全加载完成后，执行这个匿名函数
document.addEventListener('DOMContentLoaded', function () {
    // 从本地存储（localStorage）中获取名为'ID'的项目的值，这个值可能是筹款者的ID
    const fundraiserId = localStorage.getItem('ID');
    // 使用fetch API从指定的URL（'http://localhost:3060/api/funding/' + fundraiserId）获取特定筹款者的数据
    // fetch返回一个Promise，用于处理异步操作
    fetch('http://localhost:3060/api/funding/' + fundraiserId)
    .then(response => response.json())
      // 将获取到的响应（response）转换为JSON格式的数据
      // 这个操作也是异步的，所以返回一个新的Promise
    .then(data => {
                // 通过ID获取HTML页面中的一个元素，这个元素可能是用来展示特定筹款者详细信息的
                const fundraisersList = document.getElementById('fundraiserDetails');
                // 在添加新的筹款者信息之前，先清空该元素内原有的数据（innerHTML）
                fundraisersList.innerHTML = '';

                // 遍历从服务器获取到的每个筹款者（fundraiser）数据对象
                data.forEach(fundraiser => {
                    // 创建一个新的 <li> 元素，用于表示每个筹款者的信息块
                    const item = document.createElement('li');
                    // 创建一个 <p> 元素，用于显示筹款者的ID
                    const idP = document.createElement('p');
                    idP.textContent = `ID: ${fundraiser.FUNDRAISER_ID}`;
                    // 创建一个 <p> 元素，用于显示筹款者的组织者（Organizer）信息
                    const organizerP = document.createElement('p');
                    organizerP.textContent = `Organizer: ${fundraiser.ORGANIZER}`;
                    // 创建一个 <p> 元素，用于显示筹款者的标题（Caption）信息
                    const captionP = document.createElement('p');
                    captionP.textContent = `Caption: ${fundraiser.CAPTION}`;
                    // 创建一个 <p> 元素，用于显示筹款者的目标筹款金额（Target Funding）信息
                    const targetFundingP = document.createElement('p');
                    targetFundingP.textContent = `Target Funding: ${fundraiser.TARGET_FUNDING} AUD`;
                    // 创建一个 <p> 元素，用于显示筹款者的当前筹款金额（Current Funding）信息
                    const currentFundingP = document.createElement('p');
                    currentFundingP.textContent = `Current Funding: ${fundraiser.CURRENT_FUNDING} AUD`;
                    // 创建一个 <p> 元素，用于显示筹款者所在的城市（City）信息
                    const cityP = document.createElement('p');
                    cityP.textContent = `City: ${fundraiser.CITY}`;
                    // 创建一个 <p> 元素，用于显示筹款者的类别（Category）信息
                    const categoryP = document.createElement('p');
                    categoryP.textContent = `Category: ${fundraiser.CategoryName}`;
                    // 创建一个 <p> 元素，用于显示筹款者的状态（Status）信息，根据ACTIVE属性判断是活跃（Active）还是不活跃（Inactive）
                    const statusP = document.createElement('p');
                    statusP.textContent = `Status: ${fundraiser.ACTIVE? 'Active' : 'Inactive'}`;

                    // 将各个包含筹款者信息的 <p> 元素添加到对应的 <li> 元素中
                    item.appendChild(idP);
                    item.appendChild(organizerP);
                    item.appendChild(captionP);
                    item.appendChild(targetFundingP);
                    item.appendChild(currentFundingP);
                    item.appendChild(cityP);
                    item.appendChild(categoryP);
                    item.appendChild(statusP);

                    // 将包含完整筹款者信息的 <li> 元素添加到筹款者列表（fundraisersList）元素中
                    fundraisersList.appendChild(item);
                });
            })
    .catch(error => console.error('Error fetching fundraisers:', error));
     // 如果在fetch过程中出现错误，捕获错误并在控制台打印错误信息
});

function handleDonateClick() {
    // 当函数被调用时，显示一个警告框，提示此功能正在建设中
    alert('This feature is under construction.');
}

// 为id为'donateButton'的按钮元素添加一个点击事件监听器
// 当按钮被点击时，调用handleDonateClick函数
document.getElementById('donateButton').addEventListener('click', handleDonateClick);
/**在DOMContentLoaded事件处理函数中，首先从本地存储获取一个筹款者 ID，然后使用fetch从服务器获取该筹款者的详细信息。
 * 获取到数据后，先清空指定元素（fundraiserDetails）中的旧数据，再遍历数据中的每个筹款者对象，为每个对象创建一个包含各种信息（
 * 如 ID、组织者、标题、筹款金额、城市、类别、状态等）的<li>元素，并将这些<li>元素添加到fundraiserDetails元素中，从而在页面上展示筹款者的详细信息。
定义了handleDonateClick函数，当点击捐赠按钮（donateButton）时调用该函数，目前该函数只是显示一个提示功能正在建设中的警告框。
通过addEventListener为捐赠按钮绑定了点击事件监听器，使得点击按钮时能够触发相应的函数。
 */