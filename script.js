import data from './data.js'

let filteredData = data
const tableContainer = document.getElementById('table-container')
const searchButton = document.getElementById('search-button')
const searchInput = document.getElementById('search-input')

const sortByNameAscButton = document.getElementById('sort-by-name-asc-button')
const sortByNameDescButton = document.getElementById('sort-by-name-desc-button')
const sortByMarksButton = document.getElementById('sort-by-marks-button')
const sortByPassingButton = document.getElementById('sort-by-passing-button')
const sortByClassButton = document.getElementById('sort-by-class-button')
const sortByGenderButton = document.getElementById('sort-by-gender-button')

function getTableHTML(filteredData = data) {
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
                <div class="name">${student.first_name} ${
				student.last_name
			}</div>
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

	return `
        <table class="table">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Gender</td>
                    <td>Class</td>
                    <td>Marks</td>
                    <td>Passing</td>
                    <td>Email</td>
                </tr>
            </thead>

            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `
}

function render(filteredData = data) {
	tableContainer.innerHTML = getTableHTML(filteredData)
}

render(data)

searchButton.addEventListener('click', () => {
	const searchValue = searchInput.value
	filteredData = data.filter((student) => {
		const { first_name, last_name, email } = student
		return (
			first_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
			last_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
			email.toLowerCase().startsWith(searchValue.toLowerCase())
		)
	})
	if (searchValue === '') {
		render(data)
		filteredData = data
	} else {
		render(filteredData)
	}
})

searchInput.addEventListener('input', () => {
	const searchValue = searchInput.value
	filteredData = data.filter((student) => {
		const { first_name, last_name, email } = student
		return (
			first_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
			last_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
			email.toLowerCase().startsWith(searchValue.toLowerCase())
		)
	})
	if (searchValue === '') {
		render(data)
		filteredData = data
	} else {
		render(filteredData)
	}
})

sortByNameAscButton.addEventListener('click', () => {
	filteredData.sort((a, b) =>
		(a.first_name + ' ' + a.last_name).localeCompare(
			b.first_name + ' ' + b.last_name
		)
	)
	render(filteredData)
})

sortByNameDescButton.addEventListener('click', () => {
	filteredData.sort((a, b) =>
		(b.first_name + ' ' + b.last_name).localeCompare(
			a.first_name + ' ' + a.last_name
		)
	)
	render(filteredData)
})

sortByMarksButton.addEventListener('click', () => {
	filteredData.sort((a, b) => a.marks - b.marks)
	render(filteredData)
})

// TODO: Check if filteredData should be modified here or not
sortByPassingButton.addEventListener('click', () => {
	const filteredDataByPassing = filteredData.filter((a) => a.passing)
	render(filteredDataByPassing)
})

sortByClassButton.addEventListener('click', () => {
	filteredData.sort((a, b) => a.class - b.class)
	render(filteredData)
})

sortByGenderButton.addEventListener('click', () => {
	const filteredDataByMaleGender = filteredData.filter(
		(a) => a.gender === 'Male'
	)
	const filteredDataByFemaleGender = filteredData.filter(
		(a) => a.gender === 'Female'
	)

	const tables = `${getTableHTML(filteredDataByFemaleGender)} ${getTableHTML(
		filteredDataByMaleGender
	)}`

	tableContainer.innerHTML = tables
})
