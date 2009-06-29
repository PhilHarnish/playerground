describe 'PropertyParser'
  before
    input = "root"
  end

  before_each
    properties = new PropertyParser(input)
  end

  it 'should parse constructor arguments'
    properties.get().should.equal "root"
  end

  describe 'Nested input'
    before
      input = "\
Group A (tagGA)\
  property_1 (tagGAp_1)\
    value_1 (tagGAp_1_1)\
    value_2 (tagGAp_1_2)\
  property_2 (tagGAp_2)\
    value_1 (tagGAp_1_1)\
    value_2 (tagGAp_1_2)\
"
    end
  end
end