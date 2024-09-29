// document.addEventListener('DOMContentLoaded', function() {  
//     fetchFundraisers();  
// });  
  
// function fetchFundraisers() {  
//     fetch('http://localhost:3060/api/funding') // 假设你的API地址  
//         .then(response => response.json())  
//         .then(data => {  
//             const fundraisersList = document.getElementById('fundraisersList');  
//             fundraisersList.innerHTML = ''; // 清空旧数据  
  
//             data.forEach(fundraiser => {  
//                 const item = document.createElement('li');  
//                 item.textContent = `ID: ${fundraiser.ID}, 组织者: ${fundraiser.organizer}, 标题: ${fundraiser.title}, 目标资金: ${fundraiser.targetFunds}, 当前资金: ${fundraiser.currentFunds}, 城市: ${fundraiser.city}, 类别: ${fundraiser.category}`;  
//                 fundraisersList.appendChild(item);  
//             });  
//         })  
//         .catch(error => console.error('Error fetching fundraisers:', error));  
//}
// document.addEventListener('DOMContentLoaded', function() {  
//     fetch('/api/funding')  
//         .then(response => response.json())  
//         .then(data => {  
//             const list = document.getElementById('fundraiser-list');  
//             data.forEach(fundraiser => {  
//                 const item = document.createElement('li');  
//                 item.textContent = `  
//                     ID: ${fundraiser.FUNDRAISER_ID},   
//                     组织者: ${fundraiser.ORGANIZER},   
//                     标题: ${fundraiser.CAPTION},   
//                     目标资金: ${fundraiser.TARGET_FUNDING} AUD,   
//                     当前资金: ${fundraiser.CURRENT_FUNDING} AUD,   
//                     城市: ${fundraiser.CITY},   
//                     类别: ${fundraiser.CategoryName}  
//                 `;  
//                 list.appendChild(item);  
//             });  
//         })  
//         .catch(error => console.error('Error:', error));  
// });
document.addEventListener('DOMContentLoaded', function() {  
    fetch('http://localhost:3060/api/funding')  
        .then(response => response.json())  
        .then(data => {  
            const fundraisersList = document.getElementById('fundraisersList');  
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
                item.addEventListener("click", function () {
                    localStorage.setItem("ID", fundraiser.FUNDRAISER_ID);
                    location.href = '/fundraiser';
                });
                fundraisersList.appendChild(item);  
            });  
            
        })  
        .catch(error => console.error('Error fetching fundraisers:', error));  
});