export function modifiedTableList(list, message) {
	const { newIndex, oldIndex, element } = message.moved
	const startIndex = Math.min(newIndex, oldIndex)
	const modifiedList = list.slice(0, startIndex)

	for(
		let i = startIndex, j = i + Number(newIndex > oldIndex);
		modifiedList.length < list.length; 
		i++, j++
	) {
		if(i === newIndex) {
			modifiedList[i] = element
			j--
		} else {
			modifiedList[i] = list[j]
		}
	}
	return modifiedList
}