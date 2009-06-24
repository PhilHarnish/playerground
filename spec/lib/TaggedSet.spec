describe 'TaggedSet'
  before_each
    set = new TaggedSet()
  end
  
  it 'should add values'
    set.add(1).get().should.eql 1
  end
  
  it 'should not filter without tags'
    set.add(1).get([]).should.eql 1
  end

  it 'should only get one value'
    set.add(1).add(2).get().should.be_within 1..2
  end

  describe 'tagging'
    it 'should find tagged values'
      set.add(1, ['a']).get('a').should.equal 1
    end
    
    it 'should return only matching tags'
      set.add(1, ['a']).get('b').should.be_null
    end
  end
end
