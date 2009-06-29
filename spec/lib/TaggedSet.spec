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
      set.add(1, ['a']).get('a').should.equal 1
    end

    it 'should ignore irrelevant tags'
      set.add(1, ['a']).get('b').should.be 1
    end

    it 'should distinguish tagged values'
      set.add(1, ['a']).add(2, ['b']).get('a').should.equal 1
    end

    it 'should filter on relevant tags and ignore irrelevant tags'
      set.add(1, ['prime', 'odd', 'first']).add(2, ['prime', 'even']).
          add(3, ['prime', 'odd']).add(4, ['even'])
      set.get(['prime', 'first', 'nonsense']).should.equal 1
      set.get(['prime', 'even', 'nonsense']).should.equal 2
    end
  end

  describe 'compound sets'
    before_each
      set.add((new TaggedSet('parent-A')).add('child-Aa', ['a'])
                                         .add('child-Ab', ['b']),
              ['A'])
      set.add((new TaggedSet('parent-B')).add('child-Ba', ['a'])
                                         .add('child-Bb', ['b']),
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

    it 'should traverse nested sets with tags'
      set.open('B').get('a').should.equal 'child-Ba'
    end

    describe 'dumping'
      it 'should dump primatives'
        set.open().open().dump().should.match /child/
      end

      it 'should dump arrays'
        set.open('A').dump().should.eql ['child-Aa', 'child-Ab']
      end

      it 'should dump maps'
        raw = {
          'parent-A': ['child-Aa', 'child-Ab'],
          'parent-B': ['child-Ba', 'child-Bb']
        }
        set.dump().should.eql raw
      end

      it 'should dump tagged primitives'
        set.open('A').open('a').dump().should.equal 'child-Aa'
      end

      it 'should dump primitives from tag filtered arrays'
        set.open('A').dump('a').should.equal 'child-Aa'
      end

      it 'should dump submaps from tag filtered maps'
        set.dump('A').should.eql {'parent-A': ['child-Aa', 'child-Ab']}
      end

      it 'should dump maps with filtered leaves'
        filtered = {
          'parent-A': 'child-Aa',
          'parent-B': 'child-Ba'
        }
        set.dump('a').should.eql filtered
      end
    end
  end
end
