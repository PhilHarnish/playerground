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

describe 'tagging sets'
  before
    list = [1, 2, 3]
    set = new TaggedSet(list)
  end

  it 'should start without tags'
    set.tags.should.be_empty
  end

  it 'should tag everything in the set'
    set.tag('integers')
    set.tags.integers.should.eql list
  end

  it 'should not tag new items'
    set.tag('numbers')
    set.push(4, 5, 6)
    set.tags.numbers.should.not.include 4, 5, 6
  end

  it 'should tag individual items'
    set.tag(5, 'fingers')
    set.tags.fingers.should.eql [5]
  end
end
