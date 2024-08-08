const button=document.getElementById('copy');
const handleCopy=async()=>{
    const input=document.getElementById('linkBox');
    await navigator.clipboard.writeText(input.value).catch(err=>{console.log(err)});
    button.innerText="Copied!";
}