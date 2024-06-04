import data from './data.js'

const tableBody = document.getElementById('tableBody')

function render(filteredData=data) {
	const tableRows = filteredData
		.map((student) => {
			return `
        <tr>
        <td>${student.id}</td>
        <td>
            <div class="flex-row">
                <div class="avatar">
                    <img
                        src="${student.img_src}"
                        alt="avatar-img"
                    />
                </div>
                <div class="name">${student.first_name} ${student.last_name}</div>
            </div>
        </td>
        <td>${student.gender}</td>
        <td>${student.class}</td>
        <td>${student.marks}</td>
        <td>${student.passing ? 'Passing' : 'Failed'}</td>
        <td>${student.email}</td>
    </tr>
        `
		})
		.join(' ')

	tableBody.innerHTML = tableRows
}

render(data)
