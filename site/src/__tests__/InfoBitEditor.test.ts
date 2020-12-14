import InfoBitEditor from "../InfoBitEditor";

test('createRichtextEditor when no state is given', () => {
    let ibe = new InfoBitEditor()
    expect(ibe.editorState.toNotBe(undefined));
  });
  