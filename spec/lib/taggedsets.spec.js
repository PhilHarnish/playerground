describe 'tagged sets Array-like behavior'
  before
    set = new TaggedSet()
  end

  it 'should start empty'
    set.should.be_empty
  end

  it 'should push like an array'
    set.push(1, 2, 3)
    set.should.have_length 3
  end
end

describe 'tagging tagged sets'
  before
    set = new TaggedSet()
    set.push(1, 2, 3)
  end

  it 'should start without tags'
    set.tags.should.be_empty
  end
end
