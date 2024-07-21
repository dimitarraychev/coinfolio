export const saveCursorPosition = (selectionRef) => {
	const selection = window.getSelection();
	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);
		selectionRef.current = {
			startOffset: range.startOffset,
			endOffset: range.endOffset,
			startContainer: range.startContainer,
			endContainer: range.endContainer,
		};
	}
};

export const restoreCursorPosition = (selectionRef) => {
	if (selectionRef.current) {
		const range = document.createRange();
		const selection = window.getSelection();
		range.setStart(
			selectionRef.current.startContainer,
			selectionRef.current.startOffset
		);
		range.setEnd(
			selectionRef.current.endContainer,
			selectionRef.current.endOffset
		);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};
