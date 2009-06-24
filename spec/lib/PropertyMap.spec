describe 'PropertyMap'
  before_each
    props = new PropertyMap()
  end

  it 'should start empty'
    props.get().should.be_empty
  end

  describe 'population'
    it 'should store properties'
      props.add({rel: 0, autoplay: 1})
      props.get().should.eql {rel: 0, autoplay: 1}
    end
    
    it 'should store arrays'
      props.add(['di5I49yg7bY', 'RDfpd8GV9dI'])
      props.get().should.eql {0: 'di5I49yg7bY', 1: 'RDfpd8GV9dI'}
    end
  end

  describe 'filtering'
    it 'should ignore irrelevant filters'
      props.add({rel: 0, autoplay: 1})
      props.get(['nomatchingtags']).should.eql {rel: 0, autoplay: 1}
    end

    it 'should store and retrieve tagged properties'
      props.add({autoplay: [1, 'autoplay']})
      props.get(['autoplay']).should.eql {autoplay: 1}
    end
  end

  describe 'nesting'
    before_each
      submap = new PropertyMap()
      submap.add({rel: 0, autoplay: 1})
    end

    it 'should get an ordinary object'
      props.add({live: [submap]})
      props.get().should.eql {live: {rel: 0, autoplay: 1}}
    end
  end
end
