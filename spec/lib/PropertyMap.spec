describe 'PropertyMap population'
  before
    props = new PropertyMap();
  end

  it 'should start empty'
    props.get().should.be_empty
  end

  it 'should store properties'
    props.add({rel: 0, autoplay: 1});
    props.get().should.eql {rel: 0, autoplay: 1}
  end

  it 'should store tagged properties'
    props.add({video_id: ['LONG_ID', 'long']});
    props.get('nomatchingtags').should.be_empty
    props.get('long').should.eql {video_id: 'LONG_ID'}
  end
end
