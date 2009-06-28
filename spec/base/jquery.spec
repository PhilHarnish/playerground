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

  it 'should collect squares with jquery.enumerable'
    squares = $([1,2,3]).collect(function () {
      return this * this;
    });
    squares.should.eql [1,4,9]
  end
end
