document.addEventListener('DOMContentLoaded', function () {
    const fundraiserId = localStorage.getItem('ID');
    fetch('http://localhost:3060/api/funding/' + fundraiserId)
   .then(response => response.json())
   .then(data => {
            const fundraisersList = document.getElementById('fundraiserDetails');
            fundraisersList.innerHTML = ''; // 清空旧数据

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

                fundraisersList.appendChild(item);
            });
        })
   .catch(error => console.error('Error fetching fundraisers:', error));
});

function handleDonateClick() {
    alert('此功能正在建设中');
}

// 绑定事件监听器
document.getElementById('donateButton').addEventListener('click', handleDonateClick);
