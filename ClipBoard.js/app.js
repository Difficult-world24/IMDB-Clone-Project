const InputField = document.getElementById('text_input')
const CopyBtn = document.getElementById('copy_btn')

new ClipboardJS('#copy_btn')

CopyBtn.addEventListener('click',
BtnAction)

function BtnAction(){
	const Icon = CopyBtn.querySelector('img')
	Icon.src = 'clipboard-check.svg'
	CopyBtn.className = 'btn btn-success'
	setTimeout(() => {
	Icon.src = 'clipboard.svg'
	CopyBtn.className = 'btn btn-outline-primary'
	}, 1500);

}
