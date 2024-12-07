// Set up the puzzle pieces to be dragged and dropped
const puzzlePieces = document.querySelectorAll('.puzzle-piece');

// Set the background positions for each piece
const positions = [
  { top: 0, left: 0 },     // Piece 1 (top-left)
  { top: 0, left: -150 },  // Piece 2 (top-right)
  { top: -150, left: 0 },  // Piece 3 (bottom-left)
  { top: -150, left: -150 }, // Piece 4 (bottom-right)
];

// Apply the background positions to each puzzle piece
puzzlePieces.forEach((piece, index) => {
  piece.style.backgroundImage = "url('image.jpg')"; // Your image URL here
  piece.style.backgroundPosition = `${positions[index].left}px ${positions[index].top}px`;
  piece.setAttribute('draggable', 'true');
  
  // Add event listeners for drag events
  piece.addEventListener('dragstart', onDragStart);
  piece.addEventListener('dragend', onDragEnd);
});

// Handle the dragstart event
function onDragStart(e) {
  this.style.opacity = '0.5';  // Make the piece semi-transparent when dragging
  e.dataTransfer.setData('text/plain', this.id);  // Set the piece's ID in the drag data
}

// Handle the dragend event
function onDragEnd() {
  this.style.opacity = '1';  // Restore opacity after dragging
}

// Handle the dragover event for the container
document.querySelector('.puzzle-container').addEventListener('dragover', (e) => {
  e.preventDefault();  // Allow dropping by preventing the default action
});

// Handle the drop event to place the piece into the correct spot
document.querySelector('.puzzle-container').addEventListener('drop', (e) => {
  e.preventDefault();
  
  const draggedPieceId = e.dataTransfer.getData('text/plain');
  const draggedPiece = document.getElementById(draggedPieceId);
  const dropZone = e.target;
  
  // Only allow the drop if the target is a valid puzzle piece position
  if (dropZone.classList.contains('puzzle-piece') && dropZone !== draggedPiece) {
    const draggedPieceDataId = draggedPiece.getAttribute('data-id');
    const dropZoneDataId = dropZone.getAttribute('data-id');
    
    // Swap positions of the dragged and dropped pieces
    const tempBgPosition = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition = dropZone.style.backgroundPosition;
    dropZone.style.backgroundPosition = tempBgPosition;

    // Swap the data-id attributes to reflect the correct positions
    draggedPiece.setAttribute('data-id', dropZoneDataId);
    dropZone.setAttribute('data-id', draggedPieceDataId);
  }
});

