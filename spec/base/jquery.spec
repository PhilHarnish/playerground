// Test jQuery install.
describe 'jQuery'
  it 'should have the $ global'
    $.should.not.be undefined
  end
  
  it 'should create an element'
    '<em>test</em>'.should.have_text 'test'
  end
  
  it 'should create a sandbox'
    dom = sandbox()
    dom.length.should.be 1
  end
end
