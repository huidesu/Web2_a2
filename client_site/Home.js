// 当文档的DOM（文档对象模型）完全加载完成后，执行这个匿名函数
document.addEventListener('DOMContentLoaded', function () {
    // 使用fetch API从指定的URL（'http://localhost:3060/api/funding'）获取数据
    // fetch返回一个Promise，用于处理异步操作
    fetch('http://localhost:3060/api/funding')
     .then(response => response.json())
      // 将获取到的响应（response）转换为JSON格式的数据
      // 这个操作也是异步的，所以返回一个新的Promise
     .then(data => {
                // 通过ID获取HTML页面中的一个元素，这个元素可能是用来展示筹款者列表的
                const fundraisersList = document.getElementById('fundraisersList');
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

                    // 为每个筹款者信息块（<li>元素）添加一个点击事件监听器
                    item.addEventListener("click", function () {
                        // 当点击某个筹款者信息块时，将该筹款者的ID存储到本地存储（localStorage）中
                        localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                        // 然后将页面重定向到'/fundraiser'路径
                        location.href = '/fundraiser';
                    });

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
      // 如果在fetch过程中出现错误，捕获错误并在控制台打印错误信息
     .catch(error => console.error('Error fetching fundraisers:', error));
});
/**JavaScript 部分主要功能是在页面加载完成后（DOMContentLoaded事件），从服务器获取筹款者数据，
 * 并将这些数据动态地填充到 HTML 页面中的fundraisersList（活跃筹款者列表）元素中。每个筹款者的信息以
 * 列表项（li）的形式展示，包含了如 ID、组织者、标题、筹款金额、所在城市、类别和状态等信息。同时，
 * 为每个筹款者信息块添加了点击事件监听器，当点击时将筹款者的 ID 存储到本地存储，并将页面重定向到特定路径（/fundraiser）。
 * 如果在获取数据过程中出现错误，会在控制台打印错误信息。 */