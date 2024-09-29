document.addEventListener('DOMContentLoaded', function() {  
    const fundraiserId = localStorage.getItem('ID');
    fetch('http://localhost:3060/api/funding/'+fundraiserId)  
        .then(response => response.json())  
        .then(data => {  
            const fundraisersList = document.getElementById('fundraiserDetails');  
            fundraisersList.innerHTML = ''; // 清空旧数据  
  
            data.forEach(fundraiser => {  
                const item = document.createElement('li');  
                item.textContent = `  
                    ID: ${fundraiser.FUNDRAISER_ID},  
                    组织者: ${fundraiser.ORGANIZER},  
                    标题: ${fundraiser.CAPTION},  
                    目标资金: ${fundraiser.TARGET_FUNDING} AUD,  
                    当前资金: ${fundraiser.CURRENT_FUNDING} AUD,  
                    城市: ${fundraiser.CITY},  
                    类别: ${fundraiser.CategoryName},  
                    状态: ${fundraiser.ACTIVE ? '活跃' : '未活跃'}  
                `;  
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