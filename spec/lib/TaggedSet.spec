describe 'TaggedSet'
  before_each
    set = new TaggedSet('root')
  end

  it 'should be named root'
    set.name().should.equal 'root'
  end

  it 'should add values'
    set.add(1).get().should.equal 1
  end

  it 'should only get one value'
    set.add(1).add(2).get().should.be_within 1..2
  end

  describe 'tagging'
    it 'should find tagged values'
      set.add(1, null, ['a']).get('a').should.equal 1
    end

    it 'should return only matching tags'
      set.add(1, null, ['a']).get('b').should.be_null
    end

    it 'should distinguish tagged values'
      set.add(1, null, ['a']).add(2, null, ['b']).get('a').should.equal 1
    end
  end

  describe 'compound sets'
    before_each
      set.add('parent-A',
              (new TaggedSet('parent-A')).add('child-Aa', null, ['a'])
                                         .add('child-Ab', null, ['b']),
              ['A'])
      set.add('parent-B',
              (new TaggedSet('parent-B')).add('child-Ba', null, ['a'])
                                         .add('child-Bb', null, ['b']),
              ['B'])
    end

    it 'should open a set'
      set.open().should.be_an_instance_of TaggedSet
    end

    it 'should open tagged sets'
      set.open('A').name().should.equal 'parent-A'
      set.open('B').name().should.equal 'parent-B'
    end

    it 'should store nested sets'
      set.open().get().should.match /child/
    end
  end
end
