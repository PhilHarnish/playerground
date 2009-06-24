describe 'PropertyMap'
  before_each
    props = new PropertyMap();
  end

  it 'should start empty'
    props.get().should.be_empty
  end

  describe 'population'
    it 'should store properties'
      props.add({rel: '0', autoplay: '1'});
      props.get().should.eql {rel: '0', autoplay: '1'}
    end
  end

  describe 'filtering'
    it 'should ignore irrelevant filters'
      props.add({rel: '0', autoplay: '1'});
      props.get(['nomatchingtags']).should.eql {rel: '0', autoplay: '1'}
    end

    it 'should store and retrieve tagged properties'
      props.add({video_id: ['LONG_ID_VALUE', 'long']});
      props.get(['long']).should.eql {video_id: 'LONG_ID_VALUE'}
    end
  end
end
